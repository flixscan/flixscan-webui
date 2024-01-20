import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Card, CardContent, Typography, Divider, LinearProgress } from '@mui/material';
import { Delete, DriveFileRenameOutline, Add } from '@mui/icons-material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const User = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [rowToDeleteId, setRowToDeleteId] = useState(null);

  useEffect(() => {
    // View Data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setRows(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Insert And Update Data 
  const handleSave = async () => {
    try {
      if (selectedRow != null) {
        // Update existing row
        const updatedRows = rows.map((row) =>
          row.id === selectedRow.id ? { ...row, ...formData } : row,
        );
        await axios.put(`${apiUrl}/users/${formData.id}`, formData);
        setRows(updatedRows);
      } else {
        // Create new row
        const newRow = { id: Date.now(), ...formData };
        const response = await axios.post(`${apiUrl}/users/`, formData);
        const newId = response.data.id;
        newRow.id = newId;
        setRows([...rows, newRow]);
      }
      closeDialog();
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteRow = async (id) => {
    // try {
    //   const updatedRows = rows.filter((row) => row.id !== id);
    //   await axios.delete(`${apiUrl}/organizations/${id}`);
    //   setRows(updatedRows);
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const idToDelete = rowToDeleteId;
      if (idToDelete !== null) {
        const updatedRows = rows.filter((row) => row.id !== idToDelete);
        await axios.delete(`${apiUrl}/users/${idToDelete}`);
        setRows(updatedRows);
        closeDeleteDialog();
      }
    } catch (error) {
      console.error('Error deleting row:', error);
      // Handle error (e.g., show an error message)
    }

  };

  const openDialog = (rowData) => {
    setSelectedRow(rowData || null);
    setFormData(rowData || {});
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedRow(null);
    setFormData({});
    setIsDialogOpen(false);
  };

  const openDeleteDialog = (id) => {
    setRowToDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setRowToDeleteId(null);
    setIsDeleteDialogOpen(false);
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const columns = [
    { field: 'userFirstName', headerName: 'User First Name', flex: 1 },
    { field: 'userLastName', headerName: 'User Last Name', flex: 1 },
    { field: 'userEmail', headerName: 'User Email', flex: 1 },
    { field: 'userMobile', headerName: 'User Mobile', flex: 1 },
    { field: 'userRoles', headerName: 'User Role', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button onClick={() => openDeleteDialog(params.id)} startIcon={<Delete />} color="error" className='lowercaseText'>Delete</Button>
          <Button onClick={() => openDialog(params.row)} startIcon={<DriveFileRenameOutline />} color="error" className='lowercaseText'>Edit</Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading ..<LinearProgress /></div>;
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            User
          </Typography>
          <Divider />
          <div style={{ height: 'auto', width: '100%' }}>
            <Button onClick={() => openDialog(null)} startIcon={<Add />} className="lowercaseText" variant="contained" color="error" sx={{ marginY: 3 }}>Add New User</Button>
            <DataGrid rows={rows} columns={columns} initialState={{
              pagination: { paginationModel: { pageSize: 50 } },
            }}
              pageSizeOptions={[50, 75, 100]}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </CardContent >
      </Card>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{selectedRow ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          {/* {Object.keys(formData).map((field) => (
           <TextField id="outlined-basic" variant="outlined"   key={field} fullWidth label={field} name={field} 
           value={formData[field]}
           onChange={handleChange}
           margin="normal"
          />
        ))} */}
          <TextField
            name="userFirstName"
            label="User First Name"
            value={formData.userFirstName || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="userLastName"
            label="User Last Name"
            value={formData.userLastName || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="userEmail"
            label="User Email"
            value={formData.userEmail || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="userPass"
            label="User Pass"
            value={formData.userPass || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="userMobile"
            label="User Mobile"
            value={formData.userMobile || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="userRoles"
            label="User Roles"
            value={formData.userRoles || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="isActive"
            label="User Active"
            value={formData.isActive || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="isVerified"
            label="User Verified"
            value={formData.isVerified || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="error">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this User?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteRow} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default User