import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const Dropzone = () => {

  const [file, setFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    
  }, []);
  const {acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });
  const files = acceptedFiles.map(file => (
    <li style={{}} key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      // Make an API request using Axios
      const response = await axios.post(`${apiUrl}/templates/renderer`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Use the base64 string as the source of an image element
      const imgElement = document.createElement('img');
      imgElement.src = `data:image/png;base64,${response.data}`;
      imgElement.style.boxShadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px';
      const targetId = document.getElementById('image');
      targetId.appendChild(imgElement);

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div style={{ minHeight: '140px', border: "5px dashed  #525252 ", alignItems: "center", justifyContent: 'center', display: 'flex' }}>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            {/* <p style={{ textAlign: 'center', padding: 0, margin: 0 }}><CloudDownloadIcon fontSize='large' /></p> */}
            Drag 'n' drop some files here, or click to select files
          </Typography>
        </div>
      </div>
      <aside>
        <ul style={{ listStyleType: 'none', padding: 0 }}><h3>{files}</h3></ul>
      </aside>
      <button onClick={handleUpload}>Upload</button>
      <div id="image" style={{ textAlign:"center"}}></div>
    </section>
  );
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default Dropzone;