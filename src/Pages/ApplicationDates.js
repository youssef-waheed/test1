import React, { useEffect, useState } from 'react';import "../Style/AppDate.css";
import Table from "react-bootstrap/Table";

import axios from 'axios';

const ApplicationDates = () => {
  const [tabs, setTabs] = useState([]);
  const [NewMales, setNewMales] = useState([]);
  const [OldMAles, setOldMales] = useState([]);
  const [OldFemales, setOldFemales] = useState([]);

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/timingNew/getNewFemales?authorization=Bearer__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDY5NTZjM2YwOTVlMzQ4MDEzNmE4ZiIsImVtYWlsIjoibm91ckBnbWFpbC5jb20iLCJpYXQiOjE2OTkxMjQ2MzEsImV4cCI6MTY5OTEyODIzMX0._EuDcQXZxq1P3myEyBOW7bfJYH2BLMM1Kzhfw-JaPt8');
      console.log(response);
      setTabs(response.data.data.date);
            
  
    } catch (error) {
      console.log("1010");

      console.log(error);
    }


    try {
      const response = await axios.get('http://localhost:5000/timingOld/getOldFemales');
      console.log(response);
      setOldFemales(response.data.data.date);
            

    } catch (error) {
      console.log("1010");

      console.log(error);
    }


    try {
      const response = await axios.get('http://localhost:5000/timingNew/getNewMales');
      console.log(response);
      setNewMales(response.data.data.date);
            

    } catch (error) {
      console.log("1010");

      console.log(error);
    }



    try {
      const response = await axios.get('http://localhost:5000/timingold/getOldMales');
      console.log(response);
      setOldMales(response.data.data.date);
            

    } catch (error) {
      console.log("1010");

      console.log(error);
    }

  };

   console.log(tabs);

  return (
    <div className="main">
      <p>مواعيد التقدم للمدن الجامعة الخاصة بجامعة حلوان</p>
      <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th> </th>
              <th>من</th>
              <th>إلي</th>
            </tr>
          </thead>
          <tbody>
            {tabs.map((tab, index) => (
              <tr key={index}>
                <td>الطالبات الجدد</td>
                <td>{tab.from}</td>
                <td>{tab.to}</td>
              </tr>
            ))}
             {OldFemales.map((tab, index) => (
              <tr key={index}>
                <td>الطالبات القدامي</td>
                <td>{tab.from}</td>
                <td>{tab.to}</td>
              </tr>
            ))}
             {NewMales.map((tab, index) => (
              <tr key={index}>
                <td>الطلاب الجدد</td>
                <td>{tab.from}</td>
                <td>{tab.to}</td>
              </tr>
            ))}
             {OldMAles.map((tab, index) => (
              <tr key={index}>
                <td>الطلاب القدامى</td>
                <td>{tab.from}</td>
                <td>{tab.to}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicationDates;
