// import React from 'react';
// import {useDropzone} from 'react-dropzone';

// const Dropzone = ({ props }) => {
//   const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  // const files = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

//   return (
//     <section className="container"  style={{ border: "3px dashed", textAlign:"center"}}>
//       <div {...getRootProps({className: 'dropzone'})}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       </div>
//       <aside>
//         <h4>Files</h4>
//         <ul>{files}</ul>
//       </aside>
//     </section>
//   );
// }

// export default Dropzone;


import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;


const Dropzone = () => {
  const [file, setFile] = useState(null);

  
  
  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });



  const handleUpload = async () => {
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }

   

      // Create a FormData object to append the file
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
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag and drop a file here, or click to select a file</p>
        )}
      </div>

      <button onClick={handleUpload}>Upload</button>



      <div id="image" style={{ textAlign:"center"}}></div>
    </div>
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