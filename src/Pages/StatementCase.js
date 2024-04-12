import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import "../Style/StatementCase.css";
import { getAuthUser } from "../helper/storage";
const auth = getAuthUser();
var userData;
const StatementCase = ({ _id }) => {
  const [loading, setLoading] = useState(false);
  const [statementSituation, setStatementSituation] = useState([]);
  const [permission, setPermission] = useState([]);
  const [building, setBuilding] = useState([]);
  // const [userData, setUserData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (_id) {
      fetchStatementCase(_id);
    }
  }, [_id]);
  // console.log('===============dddddddddddddd=====================');
  // console.log(_id);
  // console.log('===========dddddddddd=========================');

  const incremented = async () => {
    try {
      const inc = await axios.put(
        `http://localhost:5000/logs/increment/${auth.log.adminID}`,
        {
          type: "get",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createLogs = async () => {
    try {
      const logs = await axios.post("http://localhost:5000/logs/createLogs", {
        adminID: auth.log.adminID,
        adminUserName: auth.log.adminUserName,
        action: "عرض بيان الحالة",
        objectName: `للطالب ${userData.studentName},برقم الطالب ${userData.nationalID}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatementCase = async (_id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/StatementOfTheSituation/` + _id
      );

      console.log("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEES");
      console.log(response);
      console.log("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEES");

      setStatementSituation([response.data.data.student]); // Ensure statementSituation is an array
      // setUserData(response.data.data.student)
      userData = response.data.data.student;
      console.log("====================================");
      console.log(userData);
      console.log("====================================");

      setPermission(response.data.data.permissionsWithDuration);
      setBuilding(response.data.data.building);
      setLoading(false);
      incremented();
      createLogs();
    } catch (error) {
      console.log(error);
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
    <div className="container-fluid">
      <div>
        <p
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: "darkred",
            fontSize: "22px",
          }}
        >
          بيان حالة
        </p>
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>
          البيانات الأساسية
        </p>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover size="sm" style={{ lineHeight: "13px" }}>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الرقم القومى</th>
              <th>النوع</th>
              <th>تاريخ الميلاد</th>
              <th>الديانة</th>
              <th>البريد الالكترونى</th>
              <th>الكلية </th>
              <th> الفرقة</th>
              <th> رقم شئون الطلاب</th>
              <th> التقدير</th>
              <th> العنوان</th>
              <th> رقم الملف</th>
              <th> اسم ولى الأمر </th>
              <th>الرقم القومى لولى الأمر</th>

              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {statementSituation.map((student, index) => (
              <tr key={index}>
                <td>{student.studentName}</td>
                <td>{student.nationalID}</td>
                <td>{student.gender}</td>
                <td>{student.birthDate}</td>
                <td>{student.religion}</td>
                <td>{student.email}</td>
                <td>{student.College}</td>
                <td>{student.year}</td>
                <td>{student.studentCode}</td>
                <td>{student.gradeOfLastYear}</td>
                <td>{student.detailedAddress}</td>
                <td>{student.studentCode}</td>
                <td>{student.fatherName}</td>
                <td>{student.fatherNationalId}</td>
                {/* Add more table data cells as needed */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <p
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "darkred",
          fontSize: "22px",
          marginTop: "20px",
        }}
      >
        بيانات الغياب والتصاريح
      </p>
      <div className="table-responsive">
        <Table striped bordered hover size="lg" style={{ lineHeight: "13px" }}>
          <thead>
            <tr>
              <th>النوع</th>
              <th>من تاريخ</th>
              <th>حتى تاريخ</th>
              <th>حساب المدة </th>
              <th> المدة </th>
              <th> المدة بدون جمعة </th>
            </tr>
          </thead>
          <tbody>
            {permission.map((permissionItem, index) => (
              <tr key={index}>
                <td> {permissionItem.TypeOfAbsence} </td>
                <td>
                  {" "}
                  {new Date(permissionItem.dateFrom).toLocaleDateString()}{" "}
                </td>
                <td>
                  {" "}
                  {new Date(permissionItem.dateFrom).toLocaleDateString()}{" "}
                </td>
                <td> {permissionItem.date} </td>
                <td> {permissionItem.originalDurationInDays} </td>
                <td> {permissionItem.durationWithoutFriday} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <p
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "darkred",
          fontSize: "22px",
          marginTop: "20px",
        }}
      >
        بيانات السكن
      </p>
      <div className="table-responsive">
        <Table striped bordered hover size="lg" style={{ lineHeight: "13px" }}>
          <thead>
            <tr>
              <th>المكان</th>
              <th>من تاريخ السكن</th>
              <th>تاريخ الإخلاء </th>
            </tr>
          </thead>
          <tbody>
            {building.map((buildingItem, index) => (
              <tr key={index}>
                <td> {buildingItem.Name} </td>
                {statementSituation.map((student, index) => (
                  <tr key={index}>
                    <td>
                      {" "}
                      {new Date(student.housingDate).toLocaleDateString()}{" "}
                    </td>
                  </tr>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {error && (
        <div
          className="warning"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          <Alert variant="danger">خطا: لا يوجد بيانات لهذا الطالب/طالبة</Alert>
        </div>
      )}
    </div>
  );
};

export default StatementCase;
