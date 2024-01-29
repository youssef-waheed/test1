import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, NavLink } from "react-router-dom";

const ApplicationDeadline = () => {
  var idNewmale = 0;
  var idOldMale;
  var idOldFemale;
  var idNewFemale;
  const [tabs, setTabs] = useState([]);
  const [OldMales, setOldMales] = useState([]);
  const [NewMales, setNewMales] = useState([]);
  const [OldFeMales, setOldFemales] = useState([]);
  const [NewFemales, setNewFemales] = useState([]);

  useEffect(() => {
    fetchDates();
    // fetchOldMaleDates();
    // fetchOldFeMaleDates();
    // fetchNewFeMaleDates();
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
                <td>الطالبات الجدد</td>
                <td>{tab.from}</td>
                <td>{tab.to}</td>
                <Link
                  to={"/AppDeadlineUpdate"}
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  تعديل
                </Link>
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
              </tr>
            ))}
            {OldFeMales.map((tab, index) => (
              <tr key={index}>
                <td>الطالبات القدامي</td>
                <td>{tab.from}</td>
                <td>{tab.to}</td>
                <Link
                  to={"AppDeadLineUpdate"}
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  تعديل
                </Link>
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
              </tr>
            ))}
            {NewMales.map((tab, index) => (
              <tr key={index}>
                <td>الطلاب الجدد</td>
                <td>{tab.from}</td>
                <td>{tab.to}</td>
                <Link
                  to={"AppDeadLineUpdate"}
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  تعديل
                </Link>
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
              </tr>
            ))}
            {OldMales.map((tab, index) => (
              <tr key={index}>
                <td>الطلاب القدامى</td>
                <td>{tab.from}</td>
                <td>{tab.to}</td>
                <Link
                  to={"AppDeadLineUpdate"}
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    fontWeight: "bold",
                  }}
                >
                  تعديل
                </Link>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* asdasdasdasd */}
    </div>
  );
};

export default ApplicationDeadline;
