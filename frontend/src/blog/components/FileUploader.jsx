import React from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ onFilesAccepted }) => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/png": [], "image/jpeg": [], "image/jpg": [] },
    onDrop: (files) => {
      if (onFilesAccepted) {
        onFilesAccepted(files);
      }
    },
  });

  // Format file size as KB or MB
  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  // Extract only the file name
  const formatFileName = (path) => {
    return path.split("\\").pop().split("/").pop();
  };

  // Map over accepted files
  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {formatFileName(file.name)} - {formatFileSize(file.size)}
    </li>
  ));

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #cccccc",
        padding: "20px",
        textAlign: "center",
        borderRadius: "8px",
        height: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop your files here...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
      {files.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Uploaded Files</h4>
          <ul>{files}</ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
