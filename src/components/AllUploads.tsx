import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllUploads.css";

const FileEntries: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
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
  }, [reload]);


  return (
    <div className="right-container AllUploads">
      <h2>All Uploads</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {entries.length > 0
          ? entries.map((entry, index) => (
            <li key={index}>
            <span className="file-name">{entry.name || "Unnamed File"}</span>
            <button className="delete-button" title="Delete" onClick={async() => {
              if (confirm("Are you sure you want to delete the file?") == true) {
                const token = getAuthToken();
                axios.delete(`https://unelmacloud.com/api/v1/file-entries/${entry.id}`,
                {
                  headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then(() => setReload(!reload));
              }
            }}>
            </button>
          </li>
            ))
          : !loading && <p>No entries found.</p>}
      </ul>
    </div>
  );
};

export default FileEntries;
