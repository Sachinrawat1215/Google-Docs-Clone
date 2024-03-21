import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.scss';
import { createDocument, getAllUserDocuments } from '../../api/api';
import { STRINGS } from '../../utils/contants';
import Header from '../Header/Header';

function Home() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const userData = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_USER_DATA)
  );

  // Function for creating new document
  const handleCreateNewDoc = async () => {
    const documentTitle = prompt(STRINGS.CREATE_DOCUMENT_PROMPT);
    if (!documentTitle) return; // Handle empty title

    const createNewDocument = await createDocument({
      userId: userData._id,
      title: documentTitle,
    });

    if (createNewDocument.data) {
      navigate(`/docs/${createNewDocument.data}`);
    } else {
      alert(STRINGS.CREATE_DOCUMENT_FAILED_MESSAGE);
    }
  };

  // Fetch documents on component mount or userData change
  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await getAllUserDocuments(userData._id);
      if (response.status) {
        setDocuments(response.data);
      } else {
        alert(STRINGS.FETCH_DOCUMENTS_FAILED_MESSAGE);
      }
    };

    if (userData) {
      fetchDocuments();
    }
  }, [userData._id]);

  return (
    <div className="documents-container">
      <Header />
      <h1 className="username">
        {STRINGS.HI_WELCOME} {userData.name},
      </h1>
      <button className="create-doc-button" onClick={handleCreateNewDoc}>
        {STRINGS.CREATE_NEW_DOCUMENT_BUTTON}
      </button>
      <ul className="documents-list">
        {documents.map((document) => (
          <li key={document._id} className="document-item">
            <div className="document-details">
              <span className="document-title">
                {document.title || 'Document Title'}
              </span>
              <span className="document-updated-at">
                {new Date(document.updatedAt).toLocaleString()}
              </span>
            </div>
            <div className="document-actions">
              <button>
                <Link to={`/docs/${document._id}`}>
                  {STRINGS.EDIT_BUTTON_TEXT}
                </Link>
              </button>
              <button>{STRINGS.DELETE_BUTTON_TEXT}</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
