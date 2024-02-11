// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Tskeen.css';

// const Room = ({ floorId, onSelectRoom }) => {
//   const [rooms, setRooms] = useState([]);
//   const [newRoomNumber, setNewRoomNumber] = useState('');
//   const [newRoomType, setNewRoomType] = useState('');
//   const [newType, setNewType] = useState('');
//   const [newNumOfBeds, setNewNumOfBeds] = useState('');
//   const [newRoomCapacity, setNewRoomCapacity] = useState('');
//   const [editRoomId, setEditRoomId] = useState('');
//   const [editRoomNumber, setEditRoomNumber] = useState('');
//   const [editRoomType, setEditRoomType] = useState('');
//   const [editRoomCapacity, setEditRoomCapacity] = useState('');
  

//   useEffect(() => {
//     fetchRooms();
//   }, [floorId]);

//   const fetchRooms = () => {
//     axios.get(`http://localhost:5000/rooms`)
//       .then(response => {
//         if (Array.isArray(response.data.data.room)) {
//           const allRooms = response.data.data.room;
//           const filteredRooms = allRooms.filter(room => room.FloorId._id === floorId);
//           setRooms(filteredRooms);
//         } else {
//           console.error("Rooms data is not an array:", response.data);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching rooms:", error);
//       });
//   };

//   const handleRoomClick = (roomId) => {
//     onSelectRoom(roomId);
//   };

//   const addRoom = () => {
//     if (!newRoomNumber || !newRoomType || !newRoomCapacity || !newNumOfBeds) {
//         console.error("Please fill in all required fields.");
//         return;
//     }

//     axios.post('http://localhost:5000/rooms', {
//         roomNumber: newRoomNumber,
//         Type: newType,
//         roomType: newRoomType, 
//         Capacity: newRoomCapacity,
//         numOfBeds: newNumOfBeds,
//         FloorId: floorId
//     })
//     .then(response => {
//         setNewRoomNumber('');
//         setNewRoomType('');
//         setNewType('');
//         setNewNumOfBeds('');
//         setNewRoomCapacity('');
//         fetchRooms();
//     })
//     .catch(error => {
//         console.error("Error adding room:", error);
//     });
// };

//   const editRoom = () => {
//     axios.put(`http://localhost:5000/rooms/${editRoomId}`, {
//       roomNumber: editRoomNumber,
//       Type: editRoomType,
//       Capacity: editRoomCapacity
//     })
//       .then(response => {
//         setEditRoomId('');
//         setEditRoomNumber('');
//         setEditRoomType('');
//         setEditRoomCapacity('');
//         fetchRooms();
//       })
//       .catch(error => {
//         console.error("Error editing room:", error);
//       });
//   };

//   const deleteRoom = (id) => {
//     axios.delete(`http://localhost:5000/rooms/${id}`)
//       .then(response => {
//         fetchRooms();
//       })
//       .catch(error => {
//         console.error("Error deleting room:", error);
//       });
//   };

//   return (
//     <div className="room-container">
//       <h2>Rooms</h2>
//       <ul className="room-list">
//         {rooms.map(room => (
//           <li key={room._id}>
//             <div onClick={() => handleRoomClick(room._id)} className="display-room">
//               {room.roomNumber}, {room.Type}, {room.Capacity}
//             </div>
//             <div>
//               <button onClick={() => setEditRoomId(room._id)}>Edit</button>
//               <button onClick={() => deleteRoom(room._id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="add-room">
//         <input
//           type="text"
//           value={newRoomNumber}
//           onChange={e => setNewRoomNumber(e.target.value)}
//           placeholder="Room Number"
//         />
//         <input
//           type="text"
//           value={newRoomType}
//           onChange={e => setNewRoomType(e.target.value)}
//           placeholder="Room Type"
//         />
//         <input
//           type="text"
//           value={newRoomCapacity}
//           onChange={e => setNewRoomCapacity(e.target.value)}
//           placeholder="Room Capacity"
//         />
//         <button onClick={addRoom}>Add Room</button>
//       </div>
//       {editRoomId && (
//         <div className="edit-room">
//           <input
//             type="text"
//             value={editRoomNumber}
//             onChange={e => setEditRoomNumber(e.target.value)}
//             placeholder="Room Number"
//           />
//           <input
//             type="text"
//             value={editRoomType}
//             onChange={e => setEditRoomType(e.target.value)}
//             placeholder="Room Type"
//           />
//           <input
//             type="text"
//             value={editRoomCapacity}
//             onChange={e => setEditRoomCapacity(e.target.value)}
//             placeholder="Room Capacity"
//           />
//           <button onClick={editRoom}>Save</button>
//           <button onClick={() => setEditRoomId('')}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Room;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tskeen.css';

const Room = ({ floorId, onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newRoomType, setNewRoomType] = useState('');
  const [newType, setNewType] = useState('');
  const [newNumOfBeds, setNewNumOfBeds] = useState('');
  const [newRoomCapacity, setNewRoomCapacity] = useState('');
  const [editRoomId, setEditRoomId] = useState('');
  const [editRoomNumber, setEditRoomNumber] = useState('');
  const [editRoomType, setEditRoomType] = useState('');
  const [editType, setEditType] = useState('');
  const [editNumOfBeds, setEditNumOfBeds] = useState('');
  const [editRoomCapacity, setEditRoomCapacity] = useState('');
  

  useEffect(() => {
    fetchRooms();
  }, [floorId]);

  const fetchRooms = () => {
    axios.get(`http://localhost:5000/rooms`)
      .then(response => {
        if (Array.isArray(response.data.data.room)) {
          const allRooms = response.data.data.room;
          const filteredRooms = allRooms.filter(room => room.FloorId._id === floorId);
          setRooms(filteredRooms);
        } else {
          console.error("Rooms data is not an array:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching rooms:", error);
      });
  };

  const handleRoomClick = (roomId) => {
    onSelectRoom(roomId);
  };

  const addRoom = () => {
    if (!newRoomNumber || !newRoomType || !newRoomCapacity || !newNumOfBeds) {
        console.error("Please fill in all required fields.");
        return;
    }

    axios.post('http://localhost:5000/rooms', {
        roomNumber: newRoomNumber,
        Type: newType,
        roomType: newRoomType, 
        Capacity: newRoomCapacity,
        numOfBeds: newNumOfBeds,
        FloorId: floorId
    })
    .then(response => {
        setNewRoomNumber('');
        setNewRoomType('');
        setNewType('');
        setNewNumOfBeds('');
        setNewRoomCapacity('');
        fetchRooms();
    })
    .catch(error => {
        console.error("Error adding room:", error);
    });
  };

  const editRoom = () => {
    axios.put(`http://localhost:5000/rooms/${editRoomId}`, {
      roomNumber: editRoomNumber,
      Type: editType,
      roomType: editRoomType,
      Capacity: editRoomCapacity,
      numOfBeds: editNumOfBeds
    })
      .then(response => {
        setEditRoomId('');
        setEditRoomNumber('');
        setEditType('');
        setEditRoomType('');
        setEditRoomCapacity('');
        setEditNumOfBeds('');
        fetchRooms();
      })
      .catch(error => {
        console.error("Error editing room:", error);
      });
  };

  const deleteRoom = (id) => {
    axios.delete(`http://localhost:5000/rooms/${id}`)
      .then(response => {
        fetchRooms();
      })
      .catch(error => {
        console.error("Error deleting room:", error);
      });
  };

  return (
    <div className="room-container">
      <h2>الغرف</h2>
      <table className="room-table">
        <thead>
          <tr>
            <th>رقم الغرفة</th>
            <th>نوع الغرفة</th>
            <th>الاستخدام</th>
            <th>السعة</th>
            <th>عدد الاسرة</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room._id}>
              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>{room.Type}</td>
              <td>{room.Capacity}</td>
              <td>{room.numOfBeds}</td>
              <td>
                {/* <button onClick={() => handleRoomClick(room._id)}>Select</button> */}
                <button onClick={() => setEditRoomId(room._id)}>Edit</button>
                <button onClick={() => deleteRoom(room._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-room">
        <input
          type="text"
          value={newRoomNumber}
          onChange={e => setNewRoomNumber(e.target.value)}
          placeholder="رقم الغرفة"
        />
        <input
          type="text"
          value={newRoomType}
          onChange={e => setNewRoomType(e.target.value)}
          placeholder="نوع الغرفة (مميز و عادي)"
        />
        <input
          type="text"
          value={newType}
          onChange={e => setNewType(e.target.value)}
          placeholder="الاستخدام"
        />
        <input
          type="text"
          value={newRoomCapacity}
          onChange={e => setNewRoomCapacity(e.target.value)}
          placeholder="الاستيعاب"
        />
        <input
          type="text"
          value={newNumOfBeds}
          onChange={e => setNewNumOfBeds(e.target.value)}
          placeholder="عدد الاسرة"
        />
        <button onClick={addRoom}>Add Room</button>
      </div>
      {editRoomId && (
        <div className="edit-room">
          <input
            type="text"
            value={editRoomNumber}
            onChange={e => setEditRoomNumber(e.target.value)}
            placeholder="رقم الغرفة"
          />
          <input
            type="text"
            value={editRoomType}
            onChange={e => setEditRoomType(e.target.value)}
            placeholder="نوع الغرفة (عادي و مميز)"
          />
          <input
            type="text"
            value={editType}
            onChange={e => setEditType(e.target.value)}
            placeholder="الاستخدام"
          />
          <input
            type="text"
            value={editRoomCapacity}
            onChange={e => setEditRoomCapacity(e.target.value)}
            placeholder="الاستيعاب"
          />
          <input
            type="text"
            value={editNumOfBeds}
            onChange={e => setEditNumOfBeds(e.target.value)}
            placeholder="عدد الاسرة"
          />
          <button onClick={editRoom}>Save</button>
          <button onClick={() => setEditRoomId('')}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Room;
