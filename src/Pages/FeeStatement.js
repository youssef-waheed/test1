import { tab } from "@testing-library/user-event/dist/tab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { getAuthUser } from "../helper/storage";
const auth= getAuthUser();
const FeeStatement = ({ _id }) => {
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [feesData, setFeesData] = useState([]);

  useEffect(() => {
    console.log('====================================');
    console.log("useEffect triggered with _id:", _id);
    console.log('====================================');
    if (_id) {
      fetchFeeStatement(_id);
    }
  }, [_id]);
const incremented = async()=>{
    try {
     const inc= await axios.put(`http://localhost:5000/logs/increment/${auth.log.adminID}`, {
        type:"get"
      });
    } catch (error) {
      console.log(error);}}
  
  const createLogs= async()=>{
    try {
      
      const logs= await axios.post('http://localhost:5000/logs/createLogs', {
        adminID:auth.log.adminID,
        adminUserName:auth.log.adminUserName,
        action:"عرض بيان الرسوم",
        objectName:`للطالب ${userData.studentName},برقم الطالب ${userData.nationalID}`
      })}catch (error) {
      console.log(error);}}
  
  const fetchFeeStatement = async (_id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/fees/feeStatement/` + _id
      );
      // console.log(response);
      console.log(response.data.data.feesData);
      setUserData(response.data.data.userData);    
     
      setFeesData(response.data.data.feesData);
      setLoading(false);
      createLogs();
      incremented();
 
    } catch (error) {
      console.log("Error fetching fee statement:", error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status" style={{ textAlign: "center" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div>
      <div>
        <p
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: "darkred",
            fontSize: "22px",
          }}
        >
          بيان رسوم
        </p>
      </div>
      <div className="table-responsive container-fluid col-12 ">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الرقم القومى</th>
              <th>الكلية </th>
              <th>الفرقة </th>
              <th>رقم شئون الطلاب</th>
              <th>العنوان</th>
              <th>نوع السكن</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.studentName}</td>
              <td>{userData.nationalID}</td>
              <td>{userData.College}</td>
              <td>{userData.year}</td>
              <td>{userData.phoneNumber}</td>
              <td>{userData.detailedAddress}</td>
              <td>{userData.HousingType}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="table-responsive container-fluid col-12">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>الرسوم</th>
              <th>تاريخ السداد</th>
              <th>رقم القسيمة</th>
              <th>مبلغ القسيمة</th>
              <th>نوع السداد</th>
              <th>شهر السداد</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((fee, index) => (
              <tr key={index}>
                <td>{fee.kind}</td>
                <td>{fee.paymentDate}</td>
                <td>{fee.PaymentValueNumber}</td>
                <td>{fee.paymentValue}</td>
                <td>{fee.payment}</td>
                <td>{fee.monthPayment}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default FeeStatement;
