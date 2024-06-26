import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { getAuthUser } from "../helper/storage";
const auth = getAuthUser();
var _id;
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
    }
    console.log("====================================");
    console.log(auth.athurity);
    console.log("====================================");
  }, [_id]);

  const fetchFeeStatment = async (_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/fees/feeStatement/${_id}`,
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("====================================");
      console.log(_id);
      console.log("====================================");
      setFeesData(response.data.data.feesData);
      setuserData(response.data.data.userData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFeeTypes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/fees/getFeeType`,
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFeeTypes(response.data.data.fees);
    } catch (error) {
      console.log(error);
    }
  };

  const incremented = async () => {
    try {
      const inc = await axios.put(
        `http://localhost:5000/logs/increment/${auth.log.adminID}`,
        {
          type: "add",
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
        action: "اضافة رسوم",
        objectName: `للطالب ${userData.studentName},برقم الطالب ${userData.nationalID}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addFee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/fees/addFeesForStudents`,
        {
          id: _id,
          kind: fee.kind,
          paymentType: fee.paymentType,
          ofMonth: fee.ofMonth,
          ofYear: fee.ofYear,
          PaymentValueNumber: fee.PaymentValueNumber,
          paymentDate: fee.paymentDate,
          paymentValue: fee.paymentValue,
          payment: fee.payment,
        },
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFee({
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
      createLogs();
      incremented();
      fetchFeeStatment(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFees = async (_id) => {
    console.log(`Deleting fee with ID: ${_id}`);
    try {
      const response = await axios.delete(
        `http://localhost:5000/fees/deleteFeeForStudent/${_id}`, // Corrected URL
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Delete response:", response.data);
      createLogs();
      incremented();
      fetchFeeStatment(_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {auth.athurity == "الكل" && (
          <button
            onClick={toggleDiv}
            className="button"
            style={{ backgroundColor: "blue", color: "white" }}
          >
            إضافة
          </button>
        )}

        {isDivVisible && (
          <div style={{ fontWeight: "bold" }}>
            <br></br>
            <p>الإسم: {userData.studentName}</p> <br></br>
            <div className="select1">
              <p>النوع </p>
              <Form.Select
                size="sm"
                className="Type"
                value={fee.kind}
                m-5
                onChange={(e) => {
                  setFee({ ...fee, kind: e.target.value });
                }}
              >
                <option>اختر النوع...</option>
                {feeTypes.map((type, index) => (
                  <option key={index} value={type.feeType}>
                    {type.feeType}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="select1">
              <p>نوع الدفع</p>

              <Form.Select
                size="sm"
                className="Type"
                value={fee.paymentType}
                m-5
                onChange={(e) => {
                  setFee({ ...fee, paymentType: e.target.value });
                }}
              >
                <option value="شهري">شهري</option>
                <option value="سنوي">سنوي</option>
              </Form.Select>
            </div>
            <div className="select1">
              <p>عن شهر </p>
              <Form.Select
                size="sm"
                className="Type"
                value={fee.ofMonth}
                onChange={(e) => {
                  setFee({ ...fee, ofMonth: e.target.value });
                }}
              ></Form.Select>
              <Form.Select
                size="sm"
                className="Type"
                value={fee.ofYear}
                onChange={(e) => {
                  setFee({ ...fee, ofYear: e.target.value });
                }}
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
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
                value={fee.payment}
                m-5
                onChange={(e) => {
                  setFee({ ...fee, payment: e.target.value });
                }}
              >
                <option>اختر نوع السداد </option>
                <option value="يسدده الطالب">يسدده الطالب</option>
                <option value="تسدده الطالبة">تسدده الطالبة</option>
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
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>الرسوم</th>
            <th>عن شهر</th>
            <th>المبلغ </th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {feesData.map((fee, index) => (
            <tr key={index}>
              <td>{fee.kind}</td>
              <td>{fee.paymentDate}</td>
              <td>{fee.paymentValue}</td>
              <td>
                <button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => deleteFees(fee._id)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {feesData.length === 0 && (
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

export default Fees;
