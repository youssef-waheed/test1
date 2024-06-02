import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAuthUser } from "../../helper/storage";
const auth = getAuthUser();

const ApplicationDeadline = () => {
  const [students, setStudents] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Track the index of the date being edited
  const [editDate, setEditDate] = useState({
    to: "",
    from: "",
  
    forWho: "",
  });
  const [addDate, setAddDate] = useState({
    to: "",
    from: "",
  
    forWho: "",
  });
  const [deleteDate, setDeleteDate] = useState({
    to: "",
    from: "",
  });


  useEffect(() => {
    fetchDates();
    
  }, []);

  const fetchDates = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/generalTiming/getAllDate`,
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStudents(response.data.data.date);
      // console.log(response.data.data.date);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYear = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/generalTiming/getYear`,
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    
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
        action: "اضافة مواعيد التقدم ",
        objectName: `للطالب ${students.studentName},برقم الطالب ${students.nationalID}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const { to, from, forWho } = students[index];
    setEditDate({ to, from,  forWho });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDate((prevEditDate) => ({
      ...prevEditDate,
      [name]: value,
    }));
  };

  const handleSave = async (_id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/generalTiming/updateDate/` + _id,
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        },
        editDate
      );
      const updatedDate = response.data.updatedDate;
      setStudents((prevStudents) =>
        prevStudents.map((student, index) =>
          index === editIndex ? updatedDate : student
        )
      );
      createLogs();
      incremented();
      setEditIndex(-1);
      setEditDate({ to: "", from: "",  forWho: "" });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/generalTiming/addDate`,
        {
          to: addDate.to,
          from: addDate.from,
       
          forWho: addDate.forWho,
        },
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      createLogs();
      incremented();
      fetchDates();
      setAddDate({
        to: "",
        from: "",
   
        forWho: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/generalTiming/deleteDate/${_id}`,
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      createLogs();
      incremented();
      fetchDates();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setEditDate({ to: "", from: "",  forWho: "" });
  };

  return (
    <div>
      <h1>مواعيد التقديم</h1>
      <h2>السنة الدراسية: {new Date().getFullYear()}-{new Date().getFullYear()-1}</h2> {/* Display the ofYear at the top */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th ></th>
            <th>من</th>
            <th>إلى</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 &&
            students.map((dat, index) => (
              <tr key={index}>
                <td>{dat && dat.forWho}</td>
                <td>
                  {editIndex === index ? (
                    <textarea
                    
                      name="from"
                      value={editDate.from}
                      onChange={handleChange}
                    />
                  ) : dat && dat.from ? (
                    new Date(dat.from).toLocaleDateString()
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <textarea
                      name="to"
                      value={editDate.to}
                      onChange={handleChange}
                    />
                  ) : dat && dat.to ? (
                    new Date(dat.to).toLocaleDateString()
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <>
                      <button
                        style={{ backgroundColor: "green" }}
                        onClick={() => handleSave(dat._id)}
                      >
                        حفظ
                      </button>
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={handleCancel}
                      >
                        الغاء
                      </button>
                    </>
                  ) : (
                    ((auth && auth.athurity === "الكل") ||
                      auth.athurity === "تعديل") && (
                      <button
                        style={{ backgroundColor: "blue" }}
                        onClick={() => handleEdit(index)}
                      >
                        تعديل
                      </button>
                    )
                  )}
                  {auth &&
                    (auth.athurity === "الكل" || auth.athurity === "حذف") && (
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={() => handleDelete(dat._id)}
                      >
                        حذف
                      </button>
                    )}
                </td>
              </tr>
            ))}
          <tr>
            <td>
              <input
         placeholder="نوع الطلاب"
                type="text"
                name="forWho"
                value={addDate.forWho}
                onChange={(e) =>
                  setAddDate({ ...addDate, forWho: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                name="from"
                value={addDate.from}
                onChange={(e) =>
                  setAddDate({ ...addDate, from: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                name="to"
                value={addDate.to}
                onChange={(e) => setAddDate({ ...addDate, to: e.target.value })}
              />
            </td>
            <td>
              {auth &&
                (auth.athurity === "الكل" || auth.athurity === "ادخال") && (
                  <button
                    onClick={handleAdd}
                    style={{ backgroundColor: "green" }}
                  >
                    إضافة
                  </button>
                )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ApplicationDeadline;
