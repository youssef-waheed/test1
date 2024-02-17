import React, { useEffect, useState } from "react";
import "../Shared/Header";
import Checkbox from "../Shared/Checkbox";
import Table from "react-bootstrap/Table";
import axios from "axios";

const TypesOfLivings = () => {
  const [checkbox1Checked, setCheckbox1Checked] = useState(true);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [males, setMales] = useState([]);
  const [females, setFemales] = useState([]);

  useEffect(() => {
    fetchTypeOfLiving();
  }, []);

  const fetchTypeOfLiving = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/typeOfSpecialHousing/getTypeOfSpecialHousing"
      );
      setTabs(response.data.data.housing);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTypeOfLivingDetailsMale = async (idMale) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/detailsAboutTypeOfSpecialHousing/getDetailsAboutTypeOfSpecialHousing/" +
          idMale
      );
      return response.data.data.detailsAboutTypeOfSpecialHousing;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchTypeOfLivingDetailsFeMale = async (idFemale) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/detailsAboutTypeOfSpecialHousing/getDetailsAboutTypeOfSpecialHousing/" +
          idFemale
      );
      console.log(response);

      return response.data.data.detailsAboutTypeOfSpecialHousing;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const deleteTypeOfLivingMale = async (idMale) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/typeOfSpecialHousing/deleteTypeOfSpecialHousing/" +
          idMale
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTypeOfLivingFeMale = async (idFemale) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/typeOfSpecialHousing/deleteTypeOfSpecialHousing/" +
          idFemale
      );
      console.log("IDFEMALEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
      console.log(idFemale);
      console.log("IDMFEALEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox1Change = async () => {
    setCheckbox1Checked(!checkbox1Checked);
    setCheckbox2Checked(!checkbox2Checked);

    if (!checkbox1Checked && tabs.length > 0) {
      const data = await fetchTypeOfLivingDetailsMale(tabs[0]._id);
      setMales(data);
    } else {
      setMales([]);
    }
  };

  const handleCheckbox2Change = async () => {
    setCheckbox2Checked(!checkbox2Checked);
    setCheckbox1Checked(!checkbox1Checked);

    if (!checkbox2Checked && tabs.length > 0) {
      const data = await fetchTypeOfLivingDetailsFeMale(tabs[1]._id);
      setFemales(data);
    } else {
      setFemales([]);
    }
  };

  return (
    <div className="main">
      {tabs.length > 0 && (
        <div
          className="input-group"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Checkbox
            label={tabs[0].typeOfHousing}
            checked={checkbox1Checked}
            onChange={handleCheckbox1Change}
          />
          <Checkbox
            label={tabs[1].typeOfHousing}
            checked={checkbox2Checked}
            onChange={handleCheckbox2Change}
          />
        </div>
      )}

      {checkbox2Checked && (
        <div className="input-group">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>نوع المدينة</th>
                <th>السعة</th>
                <th>فعال</th>
              </tr>
            </thead>
            <tbody>
              {females.map((tab, index) => (
                <tr key={index}>
                  <td>{tab.cityType}</td>
                  <td>{tab.capacity}</td>
                  <td>{tab.isActive ? "نعم" : "لا"}</td>
                  <th>
                    {" "}
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "red",
                        fontWeight: "bold",
                      }}
                      onClick={(e) => {
                        deleteTypeOfLivingFeMale(tab.id);
                      }}
                    >
                      حذف
                    </button>{" "}
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {checkbox1Checked && (
        <div className="input-group">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>نوع المدينة</th>
                <th>السعة</th>
                <th>فعال</th>
              </tr>
            </thead>
            <tbody>
              {males.map((tab, index) => (
                <tr key={index}>
                  <td>{tab.cityType}</td>
                  <td>{tab.capacity}</td>
                  <td>{tab.isActive ? "نعم" : "لا"}</td>
                  <th>
                    {" "}
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "red",
                        fontWeight: "bold",
                      }}
                      onClick={(e) => {
                        deleteTypeOfLivingMale(tab.id);
                      }}
                    >
                      حذف
                    </button>{" "}
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TypesOfLivings;
