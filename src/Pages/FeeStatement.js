import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
var id = 1;
const FeeStatement = () => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    fetchFeeStatement(id);
  }, []);

  const fetchFeeStatement = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/fees/feeStatement/" + id
      );
      // id = response.data.data[0];
      // console.log(response);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
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
        {/* <thead>
          <tr>
            <th> الاسم</th>
            <th> عمر أشرف إسماعيل محمد</th>
          </tr>
        </thead> */}
        <tbody>
          {tabs.map((tab, index) => (
            <tr key={index}>
              <td>الطالبات الجدد </td>
              <td>{tab.from}</td>
            </tr>
          ))}
          {tabs.map((tab, index) => (
            <tr key={index}>
              <td>الرقم القومي</td>
              <td>{tab.from}</td>
            </tr>
          ))}
          {tabs.map((tab, index) => (
            <tr key={index}>
              <td>الكلية والفرقة </td>
              <td>{tab.from}</td>
            </tr>
          ))}
          {tabs.map((tab, index) => (
            <tr key={index}>
              <td>رقم شئون الطلاب </td>
              <td>{tab.from}</td>
            </tr>
          ))}
          {tabs.map((tab, index) => (
            <tr key={index}>
              <td>نوع السكن </td>
              <td>{tab.from}</td>
            </tr>
          ))}
          {tabs.map((tab, index) => (
            <tr key={index}>
              <td>العنوان </td>
              <td>{tab.from}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FeeStatement;
