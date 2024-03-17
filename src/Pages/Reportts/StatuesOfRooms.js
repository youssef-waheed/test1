import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const StatuesOfRooms = () => {
  const [roomStatues, setRoomStatues] = useState([]);
  useEffect(() => {
    fetchStatuesOfRooms();
  }, []);

  const fetchStatuesOfRooms = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Structure/RoomsStatus`
      );
      console.log(response);
      setRoomStatues(response.data.buildingInfo);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>حالة الغرف</h1>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>اسم المبنى </th>
            <th>نوع الكسن</th>
            <th> عدد الأماكن الكلية </th>
            <th> عدد الأماكن المسكنة </th>
            <th> عدد الأماكن الخالية </th>
          </tr>
        </thead>
        <tbody>
          {roomStatues.map(
            (building, index) =>
              building.RoomTypeCounts &&
              Object.keys(building.RoomTypeCounts).map(
                (roomType, roomIndex) => (
                  <tr key={`${index}-${roomIndex}`}>
                    <td>{building.Name}</td>
                    <td>{roomType}</td>
                    <td>{building.RoomTypeCounts[roomType].totalRooms}</td>
                    <td>{building.RoomTypeCounts[roomType].FilledRooms}</td>
                    <td>{building.RoomTypeCounts[roomType].EmptyRooms}</td>
                  </tr>
                )
              )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default StatuesOfRooms;
