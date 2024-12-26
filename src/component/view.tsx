import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { UploadedFile } from "./upload";
import { Card } from "primereact/card";

interface ViewFileProps {
  files: UploadedFile[];
}

const View: React.FC<ViewFileProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);

  // show file in a dialog
  const onViewContent = (file: UploadedFile) => {
    setSelectedFile(file);
  };

  const renderActions = (file: UploadedFile) => (
    <Button label="View Content" onClick={() => onViewContent(file)} />
  );

  return (
    <div className="container">
      <Card className="view-file">
        <h3>Uploaded Files</h3>
        <DataTable value={files}>
          <Column field="name" header="Name" sortable></Column>
          <Column field="type" header="Type"></Column>
          <Column header="Actions" body={(rowData) => renderActions(rowData)} />
        </DataTable>

        <Dialog
          header="File Content"
          visible={!!selectedFile}
          style={{ width: "50vw" }}
          onHide={() => setSelectedFile(null)}
        >
          {/* <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {selectedFile?.content || "No content available"}
          </pre> */}
        </Dialog>
      </Card>
    </div>
  );
};

export default View;
