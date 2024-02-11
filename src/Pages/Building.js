import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tskeen.css';

const Building = ({ onSelectBuilding, selectedCity }) => {
  const [maleBuildings, setMaleBuildings] = useState([]);
  const [femaleBuildings, setFemaleBuildings] = useState([]);
  const [newBuildingName, setNewBuildingName] = useState('');
  const [newBuildingGender, setNewBuildingGender] = useState('');
  const [editBuildingId, setEditBuildingId] = useState('');
  const [editBuildingName, setEditBuildingName] = useState('');

  useEffect(() => {
    fetchBuildings();
  }, [selectedCity]);

  const fetchBuildings = () => {
    axios.get('http://localhost:5000/buildings')
      .then(response => {
        if (Array.isArray(response.data.data.Building)) {
          const allBuildings = response.data.data.Building;
          const filteredMaleBuildings = allBuildings.filter(building => building.Gender === 'ذكر' && building.UniversityCityId === selectedCity);
          const filteredFemaleBuildings = allBuildings.filter(building => building.Gender === 'انثي' && building.UniversityCityId === selectedCity);
          setMaleBuildings(filteredMaleBuildings);
          setFemaleBuildings(filteredFemaleBuildings);
        } else {
          console.error("Buildings data is not an array:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching buildings:", error);
      });
  };

  const addBuilding = () => {
    axios.post('http://localhost:5000/buildings', {
      Name: newBuildingName,
      Gender: newBuildingGender,
      UniversityCityId: selectedCity
    })
      .then(response => {
        setNewBuildingName('');
        setNewBuildingGender('');
        fetchBuildings();
      })
      .catch(error => {
        console.error("Error adding building:", error);
      });
  };

  const editBuilding = () => {
    axios.put(`http://localhost:5000/buildings/${editBuildingId}`, { Name: editBuildingName })
      .then(response => {
        setEditBuildingId('');
        setEditBuildingName('');
        fetchBuildings();
      })
      .catch(error => {
        console.error("Error editing building:", error);
      });
  };

  const deleteBuilding = (id) => {
    axios.delete(`http://localhost:5000/buildings/${id}`)
      .then(response => {
        fetchBuildings();
      })
      .catch(error => {
        console.error("Error deleting building:", error);
      });
  };

  return (
    <div className="building-wrapper">
      <div className="building-container">
        <h2>مباني الذكور</h2>
        <ul className="building-list">
          {maleBuildings.map(building => (
            <li key={building._id}>
              <div onClick={() => onSelectBuilding(building._id)}>{building.Name}</div>
              <div>
                <button onClick={() => setEditBuildingId(building._id)}>Edit</button>
                <button onClick={() => deleteBuilding(building._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="building-container">
        <h2>مباني الاناث</h2>
        <ul className="building-list">
          {femaleBuildings.map(building => (
            <li key={building._id}>
              <div onClick={() => onSelectBuilding(building._id)}>{building.Name}</div>
              <div>
                <button onClick={() => setEditBuildingId(building._id)}>Edit</button>
                <button onClick={() => deleteBuilding(building._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-building">
        <h2>اضافة مبني</h2>
        <input
          type="text"
          value={newBuildingName}
          onChange={e => setNewBuildingName(e.target.value)}
          placeholder="اسم او رقم المبني"
        />
        <select value={newBuildingGender} onChange={e => setNewBuildingGender(e.target.value)}>
          <option value="">Select gender</option>
          <option value="ذكر">ذكر</option>
          <option value="انثي">انثي</option>
        </select>
        <button onClick={addBuilding}>Add Building</button>
      </div>
      {editBuildingId && (
        <div className="edit-building">
          <h2>تعديل علي المبني</h2>
          <input
            type="text"
            value={editBuildingName}
            onChange={e => setEditBuildingName(e.target.value)}
            placeholder="الاسم"
          />
          <button onClick={editBuilding}>Save</button>
          <button onClick={() => setEditBuildingId('')}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Building;
