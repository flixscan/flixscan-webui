import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Card, CardContent,
  Typography, Divider, LinearProgress, Box
} from '@mui/material';
import { Delete, DriveFileRenameOutline, Add, Photo } from '@mui/icons-material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const Template = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [rowToDeleteId, setRowToDeleteId] = useState(null);

  useEffect(() => {
    // View Data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/templates`);
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
        await axios.put(`${apiUrl}/templates/${formData.id}`, formData);
        setRows(updatedRows);
      } else {
        // Create new row
        const newRow = { id: Date.now(), ...formData };
        const response = await axios.post(`${apiUrl}/templates/`, formData);
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
    try {
      const idToDelete = rowToDeleteId;

      if (idToDelete !== null) {
        const updatedRows = rows.filter((row) => row.id !== idToDelete);
        await axios.delete(`${apiUrl}/templates/${idToDelete}`);
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

  const openViewDialog = (rowData) => {
    // setRowToDeleteId(id);
    setSelectedRow(rowData || null);
    setFormData(rowData || {});
    setIsViewDialogOpen(true);


    //  Object.keys(JSON.parse(rowData.templateAttribute)).map((field) => (
    //     console.log(field)
    //   ))
  };

  const closeViewDialog = () => {
    // setRowToDeleteId(null);
    setIsViewDialogOpen(false);
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const columns = [
    { field: 'templateName', headerName: 'Template Name', flex: 1 },
    { field: 'templateDetails', headerName: 'Template Details', flex: 1 },
    { field: 'templateAttribute', headerName: 'Template Attribute', flex: 1 },
    { field: 'linkedProduct', headerName: 'Linked Product', flex: 1 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <div>
          <Button onClick={() => openViewDialog(params.row)} startIcon={<Photo />} color="error" className='lowercaseText'>View</Button>
          <Button onClick={() => openDialog(params.row)} startIcon={<DriveFileRenameOutline />} color="error" className='lowercaseText'>Edit</Button>
          <Button onClick={() => openDeleteDialog(params.id)} startIcon={<Delete />} color="error" className='lowercaseText'>Delete</Button>
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
            Template
          </Typography>
          <Divider />
          <div style={{ height: 'auto', width: '100%' }}>
            <Button onClick={() => openDialog(null)} startIcon={<Add />} className="lowercaseText" variant="contained" color="error" sx={{ marginY: 3 }}>Add Template</Button>
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

      <Dialog open={isViewDialogOpen} onClose={closeViewDialog} maxWidth="lg">
        <DialogTitle>Template View</DialogTitle>
        <DialogContent>
          <Box omponent="form"
            sx={{
              '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate>
            {selectedRow && selectedRow.templateAttribute && Object.keys(JSON.parse(selectedRow.templateAttribute)).map((field) => (
              <TextField id="outlined-basic" variant="outlined" key={field} fullWidth label={field} name={field}
                value={formData[field]}
                onChange={handleChange}
                margin="normal"
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeViewDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="error">
            Save
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{selectedRow ? 'Edit Template' : 'Add Template'}</DialogTitle>
        <DialogContent>
          <TextField
            name="templateName"
            label="Template Name"
            value={formData.templateName || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="templateDetails"
            label="Template Details"
            value={formData.templateDetails || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="templateAttribute"
            label="Templata Attribute"
            value={formData.templateAttribute || ''}
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
          Are you sure you want to delete this store?
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

export default Template
