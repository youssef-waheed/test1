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
            <th>مبني</th>
            <th>نوع الغرفة</th>
            <th>الغرف الفارغة</th>
            <th>الغرف الساكنة</th>
            <th>إجمالي الغرف</th>
            <th>نوع الغرف</th>
          </tr>
        </thead>
        <tbody>
          {roomStatues.map((building, index) => (
            Object.keys(building.RoomTypeCounts).length > 0 ? (
              Object.keys(building.RoomTypeCounts).map((roomType, roomIndex) => (
                <tr key={`${index}-${roomIndex}`}>
                  {roomIndex === 0 && (
                    <td rowSpan={Object.keys(building.RoomTypeCounts).length}>
                      {building.Name}
                    </td>
                  )}
                  <td>{roomType}</td>
                  <td>{building.RoomTypeCounts[roomType].EmptyRooms}</td>
                  <td>{building.RoomTypeCounts[roomType].FilledRooms}</td>
                  <td>{building.RoomTypeCounts[roomType].totalRooms}</td>
                  <td>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                      {Object.entries(building.RoomTypeCounts[roomType]).map(([key, value]) => (
                        <li key={key}>
                          <strong>
                            {key === "EmptyRooms" ? "الغرف الفارغة" :
                             key === "FilledRooms" ? "الغرف الساكنة" :
                             key === "totalRooms" ? "إجمالي الغرف" : key}:
                          </strong> {value}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr key={`${index}-empty`}>
                <td>{building.Name}</td>
                <td colSpan="5">لا توجد بيانات للغرف</td>
              </tr>
            )
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StatuesOfRooms;
