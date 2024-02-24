//fees الرسوم
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Fees = ({ _id }) => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [feesData, setFeesData] = useState([]);
  const [userData, setuserData] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [fee, setFee] = useState({
    id: "",
    kind: "",
    paymentType: "",
    ofMonth: "",
    ofYear: "",
    PaymentValueNumber: "",
    paymentDate: "",
    paymentValue: "",
    payment: "",
  });

  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
  };

  useEffect(() => {
    if (_id) {
      fetchFeeStatment(_id);
      fetchFeeTypes();
      // addFee();
    }
  }, [_id]);
  console.log("====================================");
  console.log(`id for student: ${_id}`);
  console.log("====================================");

  const fetchFeeStatment = async (_id) => {
    try {
      const response = await axios.get(
        ` http://localhost:5000/fees/feeStatement/${_id}`
      );
      console.log(response);
      setFeesData(response.data.data.feesData);
      setuserData(response.data.data.userData);
      console.log("=================$$$$$$$$$$$===================");
      console.log(userData);
      console.log("=======================$$$$$$$$$=============");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("===USERDATA=================================");
  console.log(userData);
  console.log("====================================");
  const fetchFeeTypes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/fees/getFeeType`);
      console.log(response);
      setFeeTypes(response.data.data.fees);
    } catch (error) {
      console.log(error);
    }
  };

  const addFee = async () => {
    try {
      const response = await axios
        .post(` http://localhost:5000/fees/addFeesForStudents`, {
          id: _id,
          kind: fee.kind,
          paymentType: fee.paymentType,
          ofMonth: fee.ofMonth,
          ofYear: fee.ofYear,
          PaymentValueNumber: fee.PaymentValueNumber,
          paymentDate: fee.paymentDate,
          paymentValue: fee.paymentValue,
          payment: fee.payment,
        })
        .then((response) => {
          setFee({
            ...fee,
            id: "",
            kind: "",
            paymentType: "",
            ofMonth: "",
            ofYear: "",
            PaymentValueNumber: "",
            paymentDate: "",
            paymentValue: "",
            payment: "",
          });
        });
      console.log("FEFFEFEFEFEFEFEFFEF");
      console.log(fee);
      console.log("FEFFEFEFEFEFEFEFFEF");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // function typeChange(event) {
  //   const selectedType = event.target.value;
  //   setFee(selectedType);
  //   console.log("====================================");
  //   console.log(selectedType);
  //   setFee(selectedType, () => fetchStudents());
  //   console.log("===================================="); // Update the ofYear state with the selected value
  // }

  return (
    <div>
      <div>
        <button
          onClick={toggleDiv}
          className="button"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          إضافة
        </button>
        {isDivVisible && (
          <div style={{ fontWeight: "bold" }}>
            <br></br>
            <p>الإسم: {userData.studentName}</p> <br></br>
            <div className="select1">
              <p>النوع </p>
              <Form.Select
                size="sm"
                className="Type"
                m-5
                onChange={(e) => {
                  setFee({ ...fee, kind: e.target.value });
                }}
              >
                {feeTypes.map((type, index) => (
                  <option key={index}>{type.feeType}</option>
                ))}
              </Form.Select>
            </div>
            <div className="select1">
              <p>نوع الدفع</p>

              <Form.Select
                size="sm"
                className="Type"
                m-5
                onChange={(e) => {
                  setFee({ ...fee, paymentType: e.target.value });
                }}
              >
                {/* {" "} */}
                <option>شهري</option>
                <option>سنوي</option>
              </Form.Select>
            </div>
            <div className="select1">
              <p>عن شهر </p>
              <Form.Select
                size="sm"
                className="Type"
                onChange={(e) => {
                  setFee({ ...fee, ofMonth: e.target.value });
                }}
              >
                {" "}
                <option>أكتوبر </option>
                <option>يناير </option>
                <option>فبراير </option>
                <option>نوفمبر </option>
              </Form.Select>
              <Form.Select
                size="sm"
                className="Type"
                onChange={(e) => {
                  setFee({ ...fee, ofYear: e.target.value });
                }}
              >
                {" "}
                <option>2023 </option>
                <option>2024 </option>
                <option>2025 </option>
                <option>2026 </option>
              </Form.Select>
            </div>
            <div className="select1">
              <Form.Label htmlFor="inputPassword5">رقم قيمة السداد</Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setFee({ ...fee, PaymentValueNumber: e.target.value });
                }}
              />
            </div>
            <div className="select1">
              <Form.Label htmlFor="inputPassword5">تاريخ السداد</Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setFee({ ...fee, paymentDate: e.target.value });
                }}
              />
            </div>
            <div className="select1">
              <Form.Label htmlFor="inputPassword5">المبلغ </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setFee({ ...fee, paymentValue: e.target.value });
                }}
              />
            </div>
            <div className="select1">
              <Form.Label htmlFor="inputPassword5">السداد </Form.Label>
              <Form.Select
                size="sm"
                className="Type"
                m-5
                onChange={(e) => {
                  setFee({ ...fee, payment: e.target.value });
                }}
              >
                <option>يسدده الطالب</option>
                <option>تسدده الطالبة</option>
              </Form.Select>
            </div>
            <button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={addFee}
            >
              حفظ
            </button>
          </div>
        )}
      </div>{" "}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>الرسوم</th>
            <th>عن شهر</th>
            <th>المبلغ </th>
          </tr>
        </thead>
        <tbody>
          {feesData.map((fee, index) => (
            <tr key={index}>
              <td> {fee.kind} </td>
              <td> {fee.paymentDate} </td>
              <td> {fee.paymentValue} </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </Table>
      <div className="warning">
        <>
          {["danger"].map((variant) => (
            <Alert
              key={variant}
              variant={variant}
              style={{ textAlign: "center" }}
            >
              This is a {variant} alert—check it out!
            </Alert>
          ))}
        </>
      </div>
    </div>
  );
};

export default Fees;
