import React, { useState } from "react";
import UploadFile, { UploadedFile } from "./component/upload";
import ViewFile from "./component/view";

const App: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  // handles file uploaded
  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  return (
    <div className="upload-and-view" style={{marginLeft: '50px'}}>
      <UploadFile onFilesUploaded={handleFilesUploaded} />
      <ViewFile files={uploadedFiles} />
    </div>
  );
};

export default App;
