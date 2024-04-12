import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const UniversityStructure = () => {
  const [students, setStudents] = useState([]);
  const [College, setCollege] = useState("");
  const colleges = [
    "كلية الفنون الجميلة",
    "الهندسة بحلوان",
    "كلية الهندسة (المطرية)",
    "كلية التجارة وإدارة الأعمال (حلوان)",
    "كلية التجارة وإدارة الأعمال (الزمالك)",
    "هندسة الحاسبات والنظم  ",
    "كلية السياحة والفنادق",
    "كلية الفنون التطبيقية",
    "كلية التكنولوجيا والتعليم",
    "كلية الاقتصاد المنزلي",
    "كلية التربية الفنية",
    "كلية التربية الموسيقية",
    "كلية التربية الرياضية (بنين) بالهرم",
    "كلية التربية الرياضية (بنات) بالجزيرة",
    "كلية الحقوق",
    "كلية الآداب",
    "كلية التربية",
    "كلية الخدمة الاجتماعية",
    "كلية الصيدلة",
    "كلية العلوم",
    "كلية التمريض",
    "كلية الطب",
    "المعهد القومي للملكية الفكرية",
    "معهد التمريض",
  ];
  useEffect(() => {
    fetchUniStructure();
  }, [College]);

  const fetchUniStructure = async () => {
    const queryString = College
      ? `?College=${encodeURIComponent(College)}`
      : "";
    try {
      const response = await axios.get(
        `http://localhost:5000/Structure/univeristyStructure${queryString}`
      );
      setStudents(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  function handleCollegeChange(event) {
    const selectedCollege = event.target.value;
    setCollege(selectedCollege); // Update the state with the selected college
  }

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div className="select">
          <p className="academicyear">العام الاكديمي</p>
          <Form.Select
            size="sm"
            className="selectmenu"
            onChange={handleCollegeChange}
            value={College} // Attach onChange event handler
          >
            الكلية
            {colleges.map((college, index) => (
              <option key={index} value={college}>
                {college}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
      <div className="coll">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>اسم القسم</th>
              <th>نوع القسم</th>
              <th>برامج</th>
            </tr>
          </thead>
          <tbody>
            {students.map((department, index) => (
              <tr key={index}>
                <td>{department.departmentName}</td>
                <td>{department.departmentType}</td>
                <td>
                  {department.programs.map((program, programIndex) => (
                    <div key={programIndex}>
                      {program.programName}
                      <ul>
                        {program.levels.map((level, levelIndex) => (
                          <li key={levelIndex}>{level}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {students.length === 0 && (
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
    </div>
  );
};

export default UniversityStructure;
