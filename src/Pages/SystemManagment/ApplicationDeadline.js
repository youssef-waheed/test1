import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const ApplicationDeadline = () => {
  const [students, setStudents] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Track the index of the date being edited
  const [editDate, setEditDate] = useState({
    to: "",
    from: "",
    ofYear: "",
    forWho: "",
  });
  const [addDate, setAddDate] = useState({
    to: "",
    from: "",
    ofYear: "",
    forWho: "",
  });
  const [deleteDate, setDeleteDate] = useState({
    to: "",
    from: "",
  });
  const [year, setYear] = useState(""); // State to store ofYear

  useEffect(() => {
    fetchDates();
    fetchYear(); // Fetch ofYear when component mounts
  }, []);

  const fetchDates = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/generalTiming/getAllDate`
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
        `http://localhost:5000/generalTiming/getYear`
      );
      setYear(response.data.year); // Set the year state with the fetched value
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const { to, from, ofYear, forWho } = students[index];
    setEditDate({ to, from, ofYear, forWho });
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
        editDate
      );
      const updatedDate = response.data.updatedDate;
      setStudents((prevStudents) =>
        prevStudents.map((student, index) =>
          index === editIndex ? updatedDate : student
        )
      );
      setEditIndex(-1);
      setEditDate({ to: "", from: "", ofYear: "", forWho: "" });
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
          ofYear: addDate.ofYear,
          forWho: addDate.forWho,
        }
      );
      fetchDates();
      setAddDate({
        to: "",
        from: "",
        ofYear: "",
        forWho: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/generalTiming/deleteDate/${_id}`
      );
      fetchDates();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setEditDate({ to: "", from: "", ofYear: "", forWho: "" });
  };

  return (
    <div>
      <h1>مواعيد التقديم</h1>
      <h2>Year: {year}</h2> {/* Display the ofYear at the top */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th></th>
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
                    <button
                      style={{ backgroundColor: "blue" }}
                      onClick={() => handleEdit(index)}
                    >
                      تعديل
                    </button>
                  )}
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDelete(dat._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          <tr>
            <td>
              <input
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
              <button onClick={handleAdd} style={{ backgroundColor: "green" }}>
                إضافة
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ApplicationDeadline;
