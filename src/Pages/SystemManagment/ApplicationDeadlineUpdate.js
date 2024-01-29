import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const ApplicationDeadlineUpdate = () => {
  const [OldMales, setOldMales] = useState([]);
  const [NewMales, setNewMales] = useState([]);
  const [OldFeMales, setOldFemales] = useState([]);
  const [NewFemales, setNewFemales] = useState([]);

  return (
    <div>
      <div className="form" style={{ width: "50%" }}>
        <Form.Control type="text" placeholder="بداية تقديم الطلاب الجدد" />
        <Form.Control type="text" placeholder="بداية تقديم الطالبات الجدد" />
        <Form.Control type="text" placeholder="بداية تقديم الطلاب القدامي" />
        <Form.Control type="text" placeholder="بداية تقديم الطالبات القدامي" />
      </div>
    </div>
  );
};

export default ApplicationDeadlineUpdate;
