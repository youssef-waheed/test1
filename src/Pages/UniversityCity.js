import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tskeen.css';

const City = ({ onSelectCity }) => {
  const [cities, setCities] = useState([]);
  const [newCityName, setNewCityName] = useState('');
  const [editCityId, setEditCityId] = useState('');
  const [editCityName, setEditCityName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = () => {
    axios.get('http://localhost:5000/universityCity')
      .then(response => {
        setCities(response.data.data.city);
      })
      .catch(error => {
        console.error("Error fetching cities:", error);
      });
  };

  const addCity = () => {
    axios.post('http://localhost:5000/universityCity/', { Name: newCityName }) 
      .then(response => {
        setNewCityName('');
        fetchCities();
      })
      .catch(error => {
        console.error("Error adding city:", error);
        setError("Failed to add city. Please try again."); 
      });
  };

  const editCity = () => {
    axios.put(`http://localhost:5000/universityCity/${editCityId}`, { Name: editCityName })
      .then(response => {
        setEditCityName('');
        setEditCityId('');
        fetchCities();
      })
      .catch(error => {
        console.error("Error editing city:", error);
      });
  };

  const deleteCity = (id) => {
    axios.delete(`http://localhost:5000/universityCity/${id}`)
      .then(response => {
        fetchCities();
      })
      .catch(error => {
        console.error("Error deleting city:", error);
      });
  };

  return (
    <div className="city-container">
      <h2>المدن الجامعية</h2>
      {error && <div className="error-message">{error}</div>} 
      <ul className="city-list">
        {cities.map(city => (
          <li key={city._id}>
            <button
              onClick={() => onSelectCity(city._id)}
              className="city-button"
            >
              {city.Name}
              <div className="action-buttons">
                <button onClick={() => setEditCityId(city._id)}>Edit</button>
                <button onClick={() => deleteCity(city._id)}>Delete</button>
              </div>
            </button>
            {editCityId === city._id && (
              <div className="edit-input-container">
                <input
                  type="text"
                  value={editCityName}
                  onChange={e => setEditCityName(e.target.value)}
                  className="edit-input"
                />
                <button onClick={editCity}>Save</button>
                <button onClick={() => setEditCityId('')}>Cancel</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="add-city-container">
        <input
          type="text"
          value={newCityName}
          onChange={e => setNewCityName(e.target.value)}
          placeholder="اسم المدينة"
        />
        <button onClick={addCity}>Add City</button>
      </div>
    </div>
  );
};

export default City;
