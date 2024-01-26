import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Card, CardContent,
  Typography, Divider, LinearProgress, Box,Paper
} from '@mui/material';
import { Delete, DriveFileRenameOutline, Add, Photo } from '@mui/icons-material';

import Dropzone from './Dropzone';
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
  // Base64 string data
const data = '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'


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
            Add Template
          </Typography>
          <Divider />
          
          <div style={{ height: 'auto', width: '100%' }}>
            <Button onClick={() => openDialog(null)} startIcon={<Add />} className="lowercaseText" variant="contained" color="error" sx={{ marginY: 3 }}>Add Template</Button>
            <Box  sx={{ marginBottom: 8 }}>
          <Dropzone/>
          </Box>
          </div>
        </CardContent >
      </Card>
      <br/>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Template List
          </Typography>
          <Divider />
          
          <div style={{ height: 'auto', width: '100%' }}>
           
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
        <Paper elevation={3}>
        <img src={`data:image/png;base64,${data}`} />
         </Paper>

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


      <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="lg">
        <DialogTitle>{selectedRow ? 'Edit Template' : 'Add Template'}</DialogTitle>
        <DialogContent>
          <Dropzone/>

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
