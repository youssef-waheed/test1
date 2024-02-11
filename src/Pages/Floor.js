// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Tskeen.css';

// const Floor = ({ buildingId }) => {
//   const [floors, setFloors] = useState([]);
//   const [newFloorName, setNewFloorName] = useState('');
//   const [newFloorBuildingId, setNewFloorBuildingId] = useState('');
//   const [editFloorId, setEditFloorId] = useState('');
//   const [editFloorName, setEditFloorName] = useState('');

//   useEffect(() => {
//     fetchFloors();
//   }, [buildingId]);

//   const fetchFloors = () => {
//     axios.get('http://localhost:5000/floors')
//       .then(response => {
//         if (Array.isArray(response.data.data.floor)) {
//           const allFloors = response.data.data.floor;
//           const filteredFloors = allFloors.filter(floor => floor.BuildingId === buildingId);
//           setFloors(filteredFloors);
//         } else {
//           console.error("Floors data is not an array:", response.data);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching floors:", error);
//       });
//   };

//   const addFloor = () => {
//     axios.post('http://localhost:5000/floors', {
//       Name: newFloorName,
//       BuildingId: buildingId
//     })
//       .then(response => {
//         setNewFloorName('');
//         fetchFloors();
//       })
//       .catch(error => {
//         console.error("Error adding floor:", error);
//       });
//   };

//   const editFloor = () => {
//     axios.put(`http://localhost:5000/floors/${editFloorId}`, { Name: editFloorName })
//       .then(response => {
//         setEditFloorId('');
//         setEditFloorName('');
//         fetchFloors();
//       })
//       .catch(error => {
//         console.error("Error editing floor:", error);
//       });
//   };

//   const deleteFloor = (id) => {
//     axios.delete(`http://localhost:5000/floors/${id}`)
//       .then(response => {
//         fetchFloors();
//       })
//       .catch(error => {
//         console.error("Error deleting floor:", error);
//       });
//   };

//   return (
//     <div className="floor-container">
//       <h2>Floors</h2>
//       <ul className="floor-list">
//         {floors.map(floor => (
//           <li key={floor._id}>
//             {editFloorId === floor._id ? (
//               <div>
//                 <input type="text" value={editFloorName} onChange={e => setEditFloorName(e.target.value)} />
//                 <button onClick={editFloor}>Save</button>
//                 <button onClick={() => setEditFloorId('')}>Cancel</button>
//               </div>
//             ) : (
//               <div>
//                 {floor.Name}
//                 <button onClick={() => setEditFloorId(floor._id)}>Edit</button>
//                 <button onClick={() => deleteFloor(floor._id)}>Delete</button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//       <div className="add-floor">
//         <input
//           type="text"
//           value={newFloorName}
//           onChange={e => setNewFloorName(e.target.value)}
//           placeholder="Enter floor name"
//         />
//         <button onClick={addFloor}>Add Floor</button>
//       </div>
//     </div>
//   );
// };

// export default Floor;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tskeen.css';

const Floor = ({ buildingId, onSelectFloor }) => {
  const [floors, setFloors] = useState([]);
  const [selectedFloorId, setSelectedFloorId] = useState(null);
  const [newFloorName, setNewFloorName] = useState('');
  const [editFloorId, setEditFloorId] = useState('');
  const [editFloorName, setEditFloorName] = useState('');

  useEffect(() => {
    fetchFloors();
  }, [buildingId]);

  const fetchFloors = () => {
    axios.get(`http://localhost:5000/floors`)
      .then(response => {
        if (Array.isArray(response.data.data.floor)) {
          const allFloors = response.data.data.floor;
          const filteredFloors = allFloors.filter(floor => floor.BuildingId === buildingId);
          setFloors(filteredFloors);
        } else {
          console.error("Floors data is not an array:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching floors:", error);
      });
  };

  const addFloor = () => {
    axios.post('http://localhost:5000/floors', {
      Name: newFloorName,
      BuildingId: buildingId
    })
      .then(response => {
        setNewFloorName('');
        fetchFloors();
      })
      .catch(error => {
        console.error("Error adding floor:", error);
      });
  };

  const editFloor = () => {
    axios.put(`http://localhost:5000/floors/${editFloorId}`, { Name: editFloorName })
      .then(response => {
        setEditFloorId('');
        setEditFloorName('');
        fetchFloors();
      })
      .catch(error => {
        console.error("Error editing floor:", error);
      });
  };

  const deleteFloor = (id) => {
    axios.delete(`http://localhost:5000/floors/${id}`)
      .then(response => {
        fetchFloors();
      })
      .catch(error => {
        console.error("Error deleting floor:", error);
      });
  };

  return (
    <div className="floor-container">
      <h2>Floors</h2>
      <ul className="floor-list">
        {floors.map(floor => (
          <li key={floor._id} onClick={() => onSelectFloor(floor._id)}>
            {editFloorId === floor._id ? (
              <div>
                <input type="text" value={editFloorName} onChange={e => setEditFloorName(e.target.value)} />
                <button onClick={editFloor}>Save</button>
                <button onClick={() => setEditFloorId('')}>Cancel</button>
              </div>
            ) : (
              <div>
                   {floor.Name}
                <button onClick={() => setEditFloorId(floor._id)}>Edit</button>
                <button onClick={() => deleteFloor(floor._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="add-floor">
        <input
          type="text"
          value={newFloorName}
          onChange={e => setNewFloorName(e.target.value)}
          placeholder="Enter floor name"
        />
        <button onClick={addFloor}>Add Floor</button>
      </div>
    </div>
  );
};

export default Floor;
