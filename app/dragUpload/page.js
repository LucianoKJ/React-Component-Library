"use client";

export default function DragUpload() {
  const onChange = (e) => {
    console.log("onChange", e);
    e.preventDefault();
    const file = e.target.files[0];
    console.log("File selected:", file);
    if (file) {
      console.log("File selected:", file.name);
    }
  };
  return (
    <div>
      <input
        className="file-upload-input"
        id="upload-file"
        type="file"
        onChange={onChange}
        style={{ display: "none" }}
      />
      <label
        className="file-upload-label"
        htmlFor="upload-file"
        onDragEnter={(e) => {
          e.preventDefault();
          console.log("onDragEnter");
        }}
        onDragOver={(e) => {
          e.preventDefault();
          console.log("onDragOver");
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          console.log("onDragLeave");
        }}
        onDrop={(e) => {
          e.preventDefault();
          console.log("onDrop");
          const file = e.dataTransfer.files[0];
          console.log("File dropped:", file);
          if (file) {
            console.log("File dropped:", file.name);
          }
        }}
        style={{
          display: "inline-block",
          cursor: "pointer",
          width: "500px",
          height: "250px",
          textAlign: "center",
          border: "2px dashed #ccc",
        }}
      >
        Upload File
      </label>
    </div>
  );
}
