import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Style/InquiryAboytAdmission.css";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const InquiryAboutAdmission = () => {
  const [isAccepted, setIsAccepted] = useState(null);
  const [error, setError] = useState(null);


const handleSubmit = async (event) => {
  event.preventDefault();
  const nationalId = event.target.elements.nationalId.value;
  console.log("nationalID:", nationalId);

  try {
    const response = await axios.get(`http://localhost:5000/inquiry/result/${nationalId}`, {});


    if (response.data && response.data.data && response.data.data.context !== undefined) {
      const { context } = response.data.data;
      console.log("Context:", context);
      setIsAccepted(true);
      setError(null);
    } else {
      console.error("Unexpected response format:", response);
      setIsAccepted(false);
    }
  } catch (error) {
    console.error("Network error:", error.message);
    setIsAccepted(false);
    setError(`An error occurred. Please try again later. Error: ${error.message}`);
  }
};

  return (
    <Form className="main-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          قم بإدخال الرقم القومي المراد الاستعلام عنه لعام 2023-2024
        </Form.Label>
        <Form.Control type="number" name="nationalId" placeholder="ادخل الرقم القومي" required />
      </Form.Group>

      <Button variant="primary" type="submit">
        الاستعلام
      </Button>

      <div className="accept">
        {isAccepted === true && <Alert variant="success">تم القبول</Alert>}
        {isAccepted === false && <Alert variant="danger">لم يتم القبول</Alert>}
        {/* {error && <Alert variant="danger">{error}</Alert>} */}
      </div>
    </Form>
  );
};

export default InquiryAboutAdmission;
