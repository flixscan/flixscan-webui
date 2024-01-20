import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Card, CardContent, Typography, Divider, LinearProgress } from '@mui/material';
import { Delete, DriveFileRenameOutline, Add } from '@mui/icons-material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const Rack = () => {
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
        const response = await axios.get(`${apiUrl}/racks`);
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
        await axios.put(`${apiUrl}/racks/${formData.id}`, formData);
        setRows(updatedRows);
      } else {
        // Create new row
        const newRow = { id: Date.now(), ...formData };
        const response = await axios.post(`${apiUrl}/racks/`, formData);
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
        await axios.delete(`${apiUrl}/racks/${idToDelete}`);
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
    { field: 'rackName', headerName: 'Rack Name', flex: 1 },
    { field: 'rackDetails', headerName: 'Rack Details', flex: 1 },
    { field: 'rackArea', headerName: 'Rack Area', flex: 1 },
    { field: 'rackImage', headerName: 'Rack Image', flex: 1 },
    { field: 'epaperCount', headerName: 'Total Linked Epaper', flex: 1 },
    { field: 'gatewayCount', headerName: 'Total Linked Gateway', flex: 1 },
    { field: 'storeId', headerName: 'Store Id', flex: 1 },
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
            Rack
          </Typography>
          <Divider />
          <div style={{ height: 'auto', width: '100%' }}>
            <Button onClick={() => openDialog(null)} startIcon={<Add />} className="lowercaseText" variant="contained" color="error" sx={{ marginY: 3 }}>Add New Rack</Button>
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
        <DialogTitle>{selectedRow ? 'Edit Rack' : 'Add New Rack'}</DialogTitle>
        <DialogContent>
          {/* {Object.keys(formData).map((field) => (
           <TextField id="outlined-basic" variant="outlined"   key={field} fullWidth label={field} name={field} 
           value={formData[field]}
           onChange={handleChange}
           margin="normal"
          />
        ))} */}
          <TextField
            name="rackName"
            label="Rack Name"
            value={formData.rackName || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="rackDetails"
            label="Rack Details"
            value={formData.rackDetails || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="rackArea"
            label="Rack Area"
            value={formData.rackArea || ''}
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
          Are you sure you want to delete this rack?
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

export default Rack