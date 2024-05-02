// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import "../Style/InquiryAboytAdmission.css";
// import Alert from "react-bootstrap/Alert";
// import axios from "axios";

// const InquiryAboutAdmission = () => {
//   const [isAccepted, setIsAccepted] = useState(null);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState(""); // State to store the message

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const nationalId = event.target.elements.nationalId.value;
//     console.log("nationalID:", nationalId);
  
//     try {
//       const response = await axios.get(`http://localhost:5000/inquiry/result/${nationalId}`, {});
  
//       if (response.data && response.data.data && response.data.data.length > 0) {
//         const message = response.data.data[0]; // Accessing the first element of the array
//         console.log("Message:", message);
//         setIsAccepted(true);
//         setError(null);
//         setMessage(message); // Set the message state for display
//       } else {
//         console.error("Unexpected response format:", response);
//         setIsAccepted(false);
//       }
//     } catch (error) {
//       console.error("Network error:", error.message);
//       setIsAccepted(false);
//       setError(`An error occurred. Please try again later. Error: ${error.message}`);
//     }
//   };
  

//   return (
//     <Form className="main-form" onSubmit={handleSubmit}>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>
//           قم بإدخال الرقم القومي المراد الاستعلام عنه لعام 2023-2024
//         </Form.Label>
//         <Form.Control type="number" name="nationalId" placeholder="ادخل الرقم القومي" required />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         الاستعلام
//       </Button>

//       <div className="accept">
       
//         {/* Displaying the message */}
//         {message && <Alert variant={isAccepted ? "success" : "danger"}>{message}</Alert>}
//         {/* Displaying network error */}
//         {error && <Alert variant="danger">{error}</Alert>}
//       </div>
//     </Form>
//   );
// };

// export default InquiryAboutAdmission;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Style/InquiryAboytAdmission.css";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const InquiryAboutAdmission = () => {
  const [isAccepted, setIsAccepted] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // State to store the message

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nationalId = event.target.elements.nationalId.value;
    console.log("nationalID:", nationalId);
  
    try {
      const response = await axios.get(`http://localhost:5000/inquiry/result/${nationalId}`, {});
  
      if (response.data && response.data.data && response.data.data.length > 0) {
        const message = response.data.data[0]; // Accessing the first element of the array
        console.log("Message:", message);
        setIsAccepted(true);
        setError(null);
        setMessage(message); // Set the message state for display
      } else {
        setIsAccepted(false);
        setMessage("الرقم القومي غير مسجل بالنظام");
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
       
        {/* Displaying the message */}
        {message && <Alert variant={isAccepted ? "success" : "danger"}>{message}</Alert>}
        {/* Displaying network error */}
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
    </Form>
  );
};

export default InquiryAboutAdmission;
