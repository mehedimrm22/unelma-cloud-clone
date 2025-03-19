import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllUploads.css";

const FileEntries: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState("");
  const [isToken, setIsToken] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

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
        setIsToken(true);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
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

        if (response.data && Array.isArray(response.data.data)) {
          setEntries(response.data.data);
        } else {
          setEntries([]);
          console.warn("Unexpected response format:", response.data);
        }
      } catch (error) {
        setError(
          axios.isAxiosError(error)
            ? `Error: ${error.response?.data?.message || error.message}`
            : `Error: ${(error as Error).message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [reload]);

  // Filter entries based on search term
  const filteredEntries = entries.filter((entry) =>
    entry.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isToken ? (
        <div className="right-container AllUploads">
          <div className="search-bar">
            <svg
              id="search"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 50 50"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search by file name..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <h2>All Uploads</h2>
          {loading && (
            <iframe src="https://lottie.host/embed/f6f5a320-ef13-4138-90af-5dc1277be756/m5kx3L7Lo9.lottie"></iframe>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <ul className="file-list">
            {filteredEntries.length > 0
              ? filteredEntries.map((entry, index) => (
                  <li key={index}>
                    <span className="file-name">
                      {entry.name || "Unnamed File"}
                    </span>
                    <button
                      className="delete-button"
                      title="Delete"
                      onClick={async () => {
                        if (
                          confirm("Are you sure you want to delete the file?")
                        ) {
                          const token = getAuthToken();
                          axios
                            .delete(
                              `https://unelmacloud.com/api/v1/file-entries/${entry.id}`,
                              {
                                headers: {
                                  Accept: "application/json",
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            )
                            .then(() => setReload(!reload));
                        }
                      }}
                    ></button>
                  </li>
                ))
              : !loading && <p>No matching files found.</p>}
          </ul>
        </div>
      ) : (
        <div className="right-container AllUploads">
          <h2>All Uploads</h2>
          <p>Please log in to view your uploads.</p>
        </div>
      )}
    </>
  );
};

export default FileEntries;
