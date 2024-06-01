import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MultilevelDropdown = ({
  selectedCity,
  selectedBuilding,
  selectedFloor,
  selectedRoom,
  onSelectCity,
  onSelectBuilding,
  onSelectFloor,
  onSelectRoom
}) => {
  const [cities, setCities] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      filterBuildingsByCity(selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedBuilding) {
      filterFloorsByBuilding(selectedBuilding);
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (selectedFloor) {
      filterRoomsByFloor(selectedFloor);
    }
  }, [selectedFloor]);

  const fetchCities = () => {
    axios.get('http://localhost:5000/universityCity/')
      .then(response => {
        setCities(response.data.data.city);
      })
      .catch(error => {
        console.error("Error fetching cities:", error);
      });
  };

  const filterBuildingsByCity = (cityId) => {
    axios.get('http://localhost:5000/buildings')
      .then(response => {
        const filteredBuildings = response.data.data.Building.filter(building => building.UniversityCityId === cityId);
        setBuildings(filteredBuildings);
      })
      .catch(error => {
        console.error("Error filtering buildings:", error);
      });
  };

  const filterFloorsByBuilding = (buildingId) => {
    axios.get('http://localhost:5000/floors')
      .then(response => {
        const filteredFloors = response.data.data.floor.filter(floor => floor.BuildingId === buildingId);
        setFloors(filteredFloors);
      })
      .catch(error => {
        console.error("Error filtering floors:", error);
      });
  };

  const filterRoomsByFloor = (floorId) => {
    
      axios.get('http://localhost:5000/rooms')
        .then(response => {
          console.log("Fetched rooms data:", response.data);
          if (response.data && response.data.data && Array.isArray(response.data.data.room)) {
            const allRooms = response.data.data.room;
            const filteredRooms = allRooms.filter(room => room.FloorId && room.FloorId._id === floorId);
            console.log("Filtered rooms data:", filteredRooms);
            setRooms(filteredRooms);
          } else {
            console.error("Rooms data is not an array:", response.data);
          }
        })
        .catch(error => {
          console.error("Error fetching rooms:", error);
        });
    
  };

  return (
    <div>
      <label>Select City:</label>
      <select value={selectedCity} onChange={e => onSelectCity(e.target.value)}>
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city._id} value={city._id}>{city.Name}</option>
        ))}
      </select>

      <label>Select Building:</label>
      <select value={selectedBuilding} onChange={e => onSelectBuilding(e.target.value)}>
        <option value="">Select Building</option>
        {buildings.map(building => (
          <option key={building._id} value={building._id}>{building.Name}</option>
        ))}
      </select>

      <label>Select Floor:</label>
      <select value={selectedFloor} onChange={e => onSelectFloor(e.target.value)}>
        <option value="">Select Floor</option>
        {floors.map(floor => (
          <option key={floor._id} value={floor._id}>{floor.Name}</option>
        ))}
      </select>

      <label>Select Room:</label>
      <select value={selectedRoom} onChange={e => onSelectRoom(e.target.value)}>
        <option value="">Select Room</option>
        {rooms.map(room => (
          <option key={room._id} value={room._id}>{room.roomNumber}</option>
        ))}
      </select>
    </div>
  );
};

export default MultilevelDropdown;
