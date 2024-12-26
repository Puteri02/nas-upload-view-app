import React from "react";
import { Card } from "primereact/card";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";

export interface UploadedFile {
  name: string;
  type: string;
  content: string;
  rawFile: File;
}

interface UploadFileProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
}

const Upload: React.FC<UploadFileProps> = ({ onFilesUploaded }) => {
  const handleUpload = (event: FileUploadHandlerEvent) => {
    const files: UploadedFile[] = [];
    const promises: Promise<void>[] = [];

    event.files.forEach((file: File) => {
      const reader = new FileReader();
      const promise = new Promise<void>((resolve) => {
        reader.onload = (e) => {
          const content = e.target?.result as string;
          files.push({
            name: file.name,
            type: file.type,
            content: content,
            rawFile: file,
          });
          resolve();
        };
        reader.readAsText(file);
      });
      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      onFilesUploaded(files);
    });
  };

  return (
    <div className="container">
      <Card className="upload-file">
        <h3>Upload Files</h3>
        <h5>Please select any files to upload<span style={{color: 'red'}}>*</span></h5>
        <FileUpload
          name="files[]"
          customUpload
          multiple
          accept="*"
          // accept=".pdf"
          uploadHandler={handleUpload}
          emptyTemplate={
            <p className="p-m-0">Drag and drop files here to upload.</p>
          }
        />
      </Card>
      
    </div>
  );
};

export default Upload;
