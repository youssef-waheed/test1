import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
const GetAdmin = () => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    fetchGetAdmin();
  }, []);

  const fetchGetAdmin = async () => {
    try {
      const response = await axios.get(`
            http://localhost:5000/auth/getAdmins
            `);
      setAdmin(response.data.data.admins);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الرقم القومي </th>
            <th>الصلاحية </th>
          </tr>
        </thead>
        <tbody>
          {admin.map((admins, index) => (
            <tr key={index}>
              <td>{admins.name}</td>
              <td>{admins.nationalID}</td>
              <td>{admins.athurity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {admin.length === 0 && (
        <div className="warning">
          <Alert
            variant="danger"
            style={{
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            لا يوجد بيانات لهذا الطالب/طالبة{" "}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default GetAdmin;
