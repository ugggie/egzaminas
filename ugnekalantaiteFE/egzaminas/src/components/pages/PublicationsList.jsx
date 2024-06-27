import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import axios from 'axios';

const PublicationList = ({ publications }) => {
  const { token } = useAuth();

  // State to manage the confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [publicationIdToDelete, setPublicationIdToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/publications/${publicationIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
    setShowModal(false);
  };

  const truncateDescription = (description) => {
    if (description.length > 200) {
      return `${description.substring(0, 200)}...`;
    }
    return description;
  };

  return (
    <div className="publications-container">
      <div className='publications-header'>
        <div className='align'>
          <h1 className="publications-title">Publications</h1>

        </div>

          <Link to="/create">
            <button className="new-publication-btn">+ New Publication</button>
          </Link>
        
      </div>
      <div className="publication-list">
        {publications.map(publication => {
          return (
            <div className="publication-preview" key={publication.id}>
              <Link to={`/publications/${publication.id}`}>
                <h3>{publication.name}</h3>
                <div className='description'>{truncateDescription(publication.description)}</div>
              </Link>
            </div>
          );
        })}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this publication?</p>
            <div>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicationList;
