import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/AuthContext';

const Home = () => {
    const { token } = useAuth();
  const [publications, setPublications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPublication, setNewPublication] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
        await axios.get('http://localhost:8080/api/publications', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      setPublications(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPublication({
      ...newPublication,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};

    if (!newPublication.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!newPublication.description.trim()) {
      errors.description = 'Description is required';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    const publication = {
      name: newPublication.name,
      description: newPublication.description,
    };

    try {
      await axios.post('http://localhost:8080/api/publications', publication, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/list');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create publication. Please check your input and try again.');
    }
  };

  const handleDeletePublication = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/publications/${id}`);
      setPublications(publications.filter(pub => pub.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdatePublication = async (id, updatedPublication) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/publications/${id}`, updatedPublication);
      const updatedPublications = publications.map(pub => pub.id === id ? response.data : pub);
      setPublications(updatedPublications);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="home">
      <h1>Publications</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {publications.map(pub => (
          <li key={pub.id}>
            <div>
              <strong>{pub.name}</strong>
              <p>{pub.description}</p>
              <button onClick={() => handleDeletePublication(pub.id)}>Delete</button>
              <button onClick={() => handleUpdatePublication(pub.id, { ...pub, status: 'COMPLETED' })}>Mark as Completed</button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Create New Publication</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={newPublication.name} onChange={handleInputChange} />
          {error && error.name && <p>{error.name}</p>}
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={newPublication.description} onChange={handleInputChange} />
          {error && error.description && <p>{error.description}</p>}
        </div>
        <button type="submit">Create Publication</button>
      </form>
    </div>
  );
};

export default Home;
