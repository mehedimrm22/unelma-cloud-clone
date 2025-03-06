import React, { useState, useEffect } from "react";
import axios from "axios";

const FileEntries: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to get token from localStorage with error handling
  const getAuthToken = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Authentication token not found. Please log in.");
    }
    return token;
  };

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      setError("");

      let token;
      try {
        token = getAuthToken();
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://unelmacloud.com/api/v1/drive/file-entries?perPage=50&workspaceId=0",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response Data:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setEntries(response.data.data);
          console.log("Entries:", response.data.data);
        } else {
          setEntries([]);
          console.warn("Unexpected response format:", response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(`Error: ${error.response?.data?.message || error.message}`);
        } else {
          setError(`Error: ${(error as Error).message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div
      className="right-container"
      /* style={{
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
      }} */
    >
      <h2>File Entries</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ textAlign: "left", padding: "0" }}>
        {entries.length > 0
          ? entries.map((entry, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "8px",
                  listStyle: "none",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              >
                {entry.name || "Unnamed File"}
              </li>
            ))
          : !loading && <p>No entries found.</p>}
      </ul>
    </div>
  );
};

export default FileEntries;
