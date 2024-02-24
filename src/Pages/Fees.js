import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Fees = ({ _id }) => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [feesData, setFeesData] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);

  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
  };

  useEffect(() => {
    if (_id) {
      fetchFee(_id);
      fetchFeeTypes();
      addFeeTypes();
    }
  }, [_id]);

  const fetchFee = async (_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/fees/feeStatement/` + _id
      );
      console.log(fetchFee);
      console.log(response);
      setFeesData(response.data.data.feesData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFeeTypes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/fees/getFeeType`);
      console.log(response);
      setFeeTypes(response.data.data.fees);
    } catch (error) {
      console.log(error);
    }
  };
  const addFeeTypes = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/fees/addFeesForStudents`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
            <p>الإسم: عمر أشرف إسماعيل</p>{" "}
            <div className="select1">
              <p>النوع </p>
              <Form.Select size="sm" className="Type" m-5>
                {feeTypes.map((type, index) => (
                  <option key={index}>{type.feeType}</option>
                ))}
              </Form.Select>
            </div>
            <div className="select1">
              <p>نوع الدفع</p>
              <Form.Select size="sm" className="Type" m-5></Form.Select>
            </div>
            <div className="select1">
              <p>عن شهر </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option>أكتوبر </option>
              </Form.Select>
              <Form.Select size="sm" className="Type">
                {" "}
                <option>2023 </option>
              </Form.Select>
            </div>
            <div className="select1">
              <p>رقم قيمة السداد </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option> </option>
              </Form.Select>
            </div>
            <div className="select1">
              <p>تاريخ السداد </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option> </option>
              </Form.Select>
            </div>
            <div className="select1">
              <p> المبلغ </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option> </option>
              </Form.Select>
            </div>
            <div className="select1">
              <p> السداد </p>
              <Form.Select size="sm" className="Type">
                {" "}
                <option> يسدد الطالب </option>
              </Form.Select>
            </div>
            <button style={{ backgroundColor: "green", color: "white" }}>
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
              <td> {fee.payment} </td>
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
