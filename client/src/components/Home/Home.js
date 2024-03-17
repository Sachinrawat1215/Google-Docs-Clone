import React, { useState, useEffect } from 'react';
import './Home.scss'; // Import your CSS file

function Home(props) {
  const [username, setUsername] = useState('');
  const [documents, setDocuments] = useState([]);

  // Fetch user data (including username) and documents on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      // Replace with your actual API call to fetch user data
      const response = await fetch('http://localhost:8000/api/user'); // Replace URL
      const data = await response.json();
      setUsername(data.user.name); // Assuming name is present in user data
    };

    const fetchDocuments = async () => {
      // Replace with your actual API call to fetch user documents
      const response = await fetch('http://localhost:8000/api/documents'); // Replace URL
      const data = await response.json();
      setDocuments(data.documents); // Assuming documents are in an array named "documents"
    };

    fetchUserData();
    fetchDocuments();
  }, []);

  const handleCreateNewDoc = () => {
    // Handle create new document logic (redirect to another component)
    console.log('Create New Doc clicked');
  };

  return (
    <div className="documents-container">
      <h1 className="username">Welcome, {username}</h1>
      <button className="create-doc-button" onClick={handleCreateNewDoc}>
        Create New Doc
      </button>
      <ul className="documents-list">
        {documents.map((document) => (
          <li key={document._id} className="document-item">
            {/* Display document details here (title, excerpt, etc.) */}
            {document.title || 'Document Title'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
