import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const ApplicationDeadline = () => {
  const [tabs, setTabs] = useState([]);
  const [OldMales, setOldMales] = useState([]);
  const [NewMales, setNewMales] = useState([]);
  const [OldFeMales, setOldFemales] = useState([]);
  const [NewFemales, setNewFemales] = useState([]);

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/timingNew/getNewFemales?authorization=Bearer__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDY5NTZjM2YwOTVlMzQ4MDEzNmE4ZiIsImVtYWlsIjoibm91ckBnbWFpbC5jb20iLCJpYXQiOjE2OTkxMjQ2MzEsImV4cCI6MTY5OTEyODIzMX0._EuDcQXZxq1P3myEyBOW7bfJYH2BLMM1Kzhfw-JaPt8"
      );
      console.log(response);
      setTabs(response.data.data.date);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          {tabs.map((tab, index) => (
            <tr key={index}>
              <th>العام الأكاديمي</th>
              {/* <th> {tab.from} </th> */}
            </tr>
          ))}
        </thead>
        <tbody>
          {tabs.map((tab, index) => (
            <tr key={index}>
              <td>بداية تجديد الطلاب الجدد</td>
              <td>{tab.from}</td>
              <td>نهاية تقديم الطلاب الجدد</td>
              <td>{tab.to}</td>
              <td>
                {" "}
                <button
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    fontWeight: "bold",
                  }}
                >
                  تعديل
                </button>{" "}
                <button
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    fontWeight: "bold",
                  }}
                >
                  حذف
                </button>{" "}
              </td>
            </tr>
          ))}
          {tabs.map((tab, index) => (
            <tr key={index}>
              <td>بداية تجديد الطلاب القدامي</td>
              <td>{tab.from}</td>
              <td>نهاية تقديم الطلاب القدامي</td>
              <td>{tab.to}</td>
            </tr>
          ))}
          {tabs.map((tab, index) => (
            <tr key={index}>
              <td>بداية تجديد الطالبات الجدد</td>
              <td>{tab.from}</td>
              <td>نهاية تقديم الطالبات الجدد</td>
              <td>{tab.to}</td>
            </tr>
          ))}
          {tabs.map((tab, index) => (
            <tr key={index}>
              <td>بداية تجديد الطالبات القدامي</td>
              <td>{tab.from}</td>
              <td>نهاية تقديم الطالبات القدامي</td>
              <td>{tab.to}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplicationDeadline;
