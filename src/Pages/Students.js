import React from "react";
import Alert from "react-bootstrap/Alert";

const Students = () => {
  return (
    <div>
      <div className="warning">
        <>
          {["danger"].map((variant) => (
            <Alert
              key={variant}
              variant={variant}
              style={{ textAlign: "center" }}
            >
              لا يوجد بيانات، الطالب غير مسجل بالسكن
            </Alert>
          ))}
        </>
      </div>
    </div>
  );
};

export default Students;
