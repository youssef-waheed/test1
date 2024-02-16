import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, NavLink } from "react-router-dom";
var idNewmale = 0;
var idOldMale = 0;
var idOldFemale = 0;
var idNewFemale = 0;
const ApplicationDeadline = () => {
  const [tabs, setTabs] = useState([]);
  const [OldMales, setOldMales] = useState([]);
  const [NewMales, setNewMales] = useState([]);
  const [OldFeMales, setOldFemales] = useState([]);
  const [NewFemales, setNewFemales] = useState([]);
  const [editText, setEditText] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  // const [idToEdit, setIdToEdit] = useState(null);
  const [fromDate, setFromDate] = useState(""); // State for the from date
  const [toDate, setToDate] = useState(""); // State for the to date
  const [editRow, setEditRow] = useState(null); // State to track which row is being edited
  const [editRowData, setEditRowData] = useState({
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    fetchDates();
    // fetchOldMaleDates();
    // fetchOldFeMaleDates();
    // fetchNewFeMaleDates();
    // updateDates();
  }, []);

  const fetchDates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/timingNew/getNewFemales"
      );
      idNewFemale = response.data.data.date[0]._id;
      console.log(response);
      setTabs(response.data.data.date);
    } catch (error) {
      console.log("1010");

      console.log(error);
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/timingOld/getOldFemales"
      );
      idOldFemale = response.data.data.date[0]._id;
      console.log(response);
      setOldFemales(response.data.data.date);
    } catch (error) {
      console.log("1010");

      console.log(error);
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/timingNew/getNewMales"
      );
      idNewmale = response.data.data.date[0]._id;
      console.log(response);
      setNewMales(response.data.data.date);
    } catch (error) {
      console.log("1010");

      console.log(error);
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/timingold/getOldMales"
      );
      idOldMale = response.data.data.date[0]._id;
      console.log(response);
      setOldMales(response.data.data.date);
    } catch (error) {
      console.log("1010");

      console.log(error);
    }
  };

  const deleteNewMaleDate = async (idNewmale) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/timingNew/deleteNewMales/" + idNewmale
      );
      // console.log(response);
      // console.log(idNewmale);
      // setTabs(response.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };
  const deleteOldMaleDate = async (idOldMale) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/timingOld/deleteOldMales/" + idOldMale
      );
      // console.log(response);
      // console.log(idNewmale);
      // setTabs(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };
  const deleteOldFeMaleDate = async (idOldFemale) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/timingOld/deleteOldFemales/" + idOldFemale
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };
  const deleteNewFeMaleDate = async (idNewFemale) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/timingNew/deleteNewFemales/" + idNewFemale
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  // const handleEditClick = (index) => {
  //   setFromDate(tabs[index].from);
  //   setToDate(tabs[index].to);
  //   setEditRow(index);
  // };
  const handleEditClick = (index) => {
    // Set the fromDate and toDate based on the clicked row
    setFromDate(tabs[index].from);
    setToDate(tabs[index].to);
    // Set the editRow to the index of the clicked row
    setEditRow(index);
  };

  // Function to handle textarea change
  const handleEditTextChange = (event) => {
    // Update the corresponding field in editRowData
    setEditRowData({
      ...editRowData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveEditoldFemale = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/timingOld/updateOldFemales/" + idOldFemale,
        {
          to: editRowData.toDate, // Use editRowData instead of toDate/fromDate
          from: editRowData.fromDate,
        }
      );

      console.log("Update response:", response.data); // Log the response

      // Reset local states
      setFromDate("");
      setToDate("");
      setEditRow(null);

      // Manually update the state to reflect the changes
      setTabs((prevTabs) =>
        prevTabs.map((tab, index) =>
          index === editRow
            ? { ...tab, from: editRowData.fromDate, to: editRowData.toDate }
            : tab
        )
      );
    } catch (error) {
      console.log("Error updating date:", error);
      console.log(editRowData.fromDate);
      console.log(editRowData.toDate);
    }
  };
  const handleSaveEditoldMale = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/timingOld/updateOldMales/" + idOldMale,
        {
          to: editRowData.toDate, // Use editRowData instead of toDate/fromDate
          from: editRowData.fromDate,
        }
      );

      console.log("Update response:", response.data); // Log the response

      // Reset local states
      setFromDate("");
      setToDate("");
      setEditRow(null);

      // Manually update the state to reflect the changes
      setTabs((prevTabs) =>
        prevTabs.map((tab, index) =>
          index === editRow
            ? { ...tab, from: editRowData.fromDate, to: editRowData.toDate }
            : tab
        )
      );
    } catch (error) {
      console.log("Error updating date:", error);
      console.log(editRowData.fromDate);
      console.log(editRowData.toDate);
    }
  };
  const handleSaveEditNewMale = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/timingNew/updateNewMales/" + idNewmale,
        {
          to: editRowData.toDate, // Use editRowData instead of toDate/fromDate
          from: editRowData.fromDate,
        }
      );

      console.log("Update response:", response.data); // Log the response

      // Reset local states
      setFromDate("");
      setToDate("");
      setEditRow(null);

      // Manually update the state to reflect the changes
      setTabs((prevTabs) =>
        prevTabs.map((tab, index) =>
          index === editRow
            ? { ...tab, from: editRowData.fromDate, to: editRowData.toDate }
            : tab
        )
      );
    } catch (error) {
      console.log("Error updating date:", error);
      console.log(editRowData.fromDate);
      console.log(editRowData.toDate);
    }
  };

  const handleSaveEditNeFeMale = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/timingNew/updateNewFemales/" + idNewFemale,
        {
          to: editRowData.toDate, // Use editRowData instead of toDate/fromDate
          from: editRowData.fromDate,
        }
      );

      console.log("Update response:", response.data); // Log the response

      // Reset local states
      setFromDate("");
      setToDate("");
      setEditRow(null);

      // Manually update the state to reflect the changes
      setTabs((prevTabs) =>
        prevTabs.map((tab, index) =>
          index === editRow
            ? { ...tab, from: editRowData.fromDate, to: editRowData.toDate }
            : tab
        )
      );
    } catch (error) {
      console.log("Error updating date:", error);
      console.log(editRowData.fromDate);
      console.log(editRowData.toDate);
    }
  };

  const handleCancelEdit = () => {
    setFromDate("");
    setToDate("");
    setEditRow(null);
  };
  return (
    <div>
      <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th> </th>
              <th>من</th>
              <th>إلي</th>
            </tr>
          </thead>
          <tbody>
            {tabs.map((tab, index) => (
              <tr key={index}>
                <td>الطالبات الجدد </td>
                <td>
                  {editRow === index ? (
                    <input
                      type="text"
                      name="fromDate"
                      value={editRowData.fromDate}
                      onChange={handleEditTextChange}
                    />
                  ) : (
                    tab.from
                  )}
                </td>
                <td>
                  {editRow === index ? (
                    <input
                      type="text"
                      name="toDate"
                      value={editRowData.toDate}
                      onChange={handleEditTextChange}
                    />
                  ) : (
                    tab.to
                  )}
                </td>
                <td>
                  {editRow === index ? (
                    <>
                      <button onClick={handleSaveEditNeFeMale}>حفظ</button>
                      <button onClick={handleCancelEdit}>إلغاء</button>
                    </>
                  ) : (
                    <button
                      style={{ color: "white", backgroundColor: "green" }}
                      onClick={() => handleEditClick(index)}
                    >
                      تعديل
                    </button>
                  )}
                  <button
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      fontWeight: "bold",
                    }}
                    onClick={(e) => {
                      deleteNewFeMaleDate(tab._id);
                    }}
                  >
                    حذف
                  </button>{" "}
                </td>
              </tr>
            ))}
            {OldFeMales.map((tab, index) => (
              <tr key={index}>
                <td>الطالبات القدامي</td>
                <td>
                  {editRow === index ? (
                    <input
                      type="text"
                      name="fromDate"
                      value={editRowData.fromDate}
                      onChange={handleEditTextChange}
                    />
                  ) : (
                    tab.from
                  )}
                </td>
                <td>
                  {editRow === index ? (
                    <input
                      type="text"
                      name="toDate"
                      value={editRowData.toDate}
                      onChange={handleEditTextChange}
                    />
                  ) : (
                    tab.to
                  )}
                </td>
                <td>
                  {editRow === index ? (
                    <>
                      <button onClick={handleSaveEditoldFemale}>حفظ</button>
                      <button onClick={handleCancelEdit}>إلغاء</button>
                    </>
                  ) : (
                    <button
                      style={{ color: "white", backgroundColor: "green" }}
                      onClick={() => handleEditClick(index)}
                    >
                      تعديل
                    </button>
                  )}
                  <button
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      fontWeight: "bold",
                    }}
                    onClick={(e) => {
                      deleteOldFeMaleDate(tab._id);
                    }}
                  >
                    حذف
                  </button>{" "}
                </td>
              </tr>
            ))}
            {NewMales.map((tab, index) => (
              <tr key={index}>
                <td>الطلاب الجدد </td>
                <td>
                  {editRow === index ? (
                    <input
                      type="text"
                      name="fromDate"
                      value={editRowData.fromDate}
                      onChange={handleEditTextChange}
                    />
                  ) : (
                    tab.from
                  )}
                </td>
                <td>
                  {editRow === index ? (
                    <input
                      type="text"
                      name="toDate"
                      value={editRowData.toDate}
                      onChange={handleEditTextChange}
                    />
                  ) : (
                    tab.to
                  )}
                </td>
                <td>
                  {editRow === index ? (
                    <>
                      <button onClick={handleSaveEditNewMale}>حفظ</button>
                      <button onClick={handleCancelEdit}>إلغاء</button>
                    </>
                  ) : (
                    <button
                      style={{ color: "white", backgroundColor: "green" }}
                      onClick={() => handleEditClick(index)}
                    >
                      تعديل
                    </button>
                  )}
                  <button
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      fontWeight: "bold",
                    }}
                    onClick={(e) => {
                      deleteNewMaleDate(tab._id);
                    }}
                  >
                    حذف
                  </button>{" "}
                </td>
              </tr>
            ))}
            {OldMales.map((tab, index) => (
              <tr key={index}>
                <td>الطلاب القدامي </td>
                <td>
                  {editRow === index ? (
                    <input
                      type="text"
                      name="fromDate"
                      value={editRowData.fromDate}
                      onChange={handleEditTextChange}
                    />
                  ) : (
                    tab.from
                  )}
                </td>
                <td>
                  {editRow === index ? (
                    <input
                      type="text"
                      name="toDate"
                      value={editRowData.toDate}
                      onChange={handleEditTextChange}
                    />
                  ) : (
                    tab.to
                  )}
                </td>
                <td>
                  {editRow === index ? (
                    <>
                      <button onClick={handleSaveEditoldMale}>حفظ</button>
                      <button onClick={handleCancelEdit}>إلغاء</button>
                    </>
                  ) : (
                    <button
                      style={{ color: "white", backgroundColor: "green" }}
                      onClick={() => handleEditClick(index)}
                    >
                      تعديل
                    </button>
                  )}
                  <button
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      fontWeight: "bold",
                    }}
                    onClick={(e) => {
                      deleteOldMaleDate(tab._id);
                    }}
                  >
                    حذف
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicationDeadline;
