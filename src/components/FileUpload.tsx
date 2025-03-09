import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  // Function to get token from localStorage
  const getAuthToken = () => {
    const token = localStorage.getItem("access_token");
    console.log("Token:", token);
    if (!token) {
      throw new Error("Authentication token not found. Please log in.");
    }
    return token;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setUploading(true);
    setMessage("");

    const token = getAuthToken();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentId", "null");
    formData.append("relativePath", "");

    try {
      const response = await axios.post(
        "https://unelmacloud.com/api/v1/uploads",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Upload successful!");
      console.log("Upload Response:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        setMessage(`Error: ${(error as Error).message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="right-container upload-container">
      <h2>Upload File</h2>
      <div className="upload">
        <div className="upload-icon">
          +<p>Drag your file here</p>
          <p>or</p>
        </div>
        <label className="browse-button">
          Browse
          <input type="file" onChange={handleFileChange} />
        </label>
        {fileName && <p className="file-name">{fileName}</p>}
      </div>
      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      {message && (
        <p style={{ marginTop: "8px", fontSize: "14px", color: "#555" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default FileUploader;
