import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
var id = 1;
const FeeStatement = ({ studentId }) => {
  const [tabs, setTabs] = useState([]);
  const [feeStatement, setFeeStatement] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (studentId) {
      fetchFeeStatement(studentId);
    }
  }, [studentId]);

  const fetchFeeStatement = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/fees/feeStatement/` + id
      );
      console.log(response);
      setFeeStatement(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching fee statement:", error);
      setLoading(false);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div>
        <p
          style={{ fontWeight: "bold", textAlign: "center", color: "darkred" }}
        >
          بيان رسوم
        </p>
      </div>
      <Table striped bordered hover>
        <tbody>
          {feeStatement &&
            Object.entries(feeStatement).map(([key, value], index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FeeStatement;
