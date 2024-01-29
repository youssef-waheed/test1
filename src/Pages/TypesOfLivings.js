import React, { useState } from "react";
import "../Shared/Header";
import Checkbox from "../Shared/Checkbox";
import Table from "react-bootstrap/Table";
import { tab } from "@testing-library/user-event/dist/tab";

const TypesOfLivings = () => {
  const [checkbox1Checked, setCheckbox1Checked] = useState(true);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);

  const handleCheckbox1Change = () => {
    setCheckbox1Checked(!checkbox1Checked);
    setCheckbox2Checked(!checkbox2Checked);
  };

  const handleCheckbox2Change = () => {
    setCheckbox2Checked(!checkbox2Checked);
    setCheckbox1Checked(!checkbox1Checked);
  };
  const [tabs, setTabs] = useState([]);

  return (
    <div className="main">
      <div
        className="input-group"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Checkbox
          label="سكن مميز الطلبة"
          checked={checkbox1Checked}
          onChange={handleCheckbox1Change}
        />
        <Checkbox
          label="سكن مميز الطالبات"
          checked={checkbox2Checked}
          onChange={handleCheckbox2Change}
        />
      </div>
      {checkbox2Checked && (
        <div className="input-group">
          <Table striped bordered hover size="sm">
            <thead>
              {tabs.map((tab, index) => {
                <tr key={index}>
                  <th>اسم التميز</th>
                  <th> {tab.from} </th>
                </tr>;
              })}
            </thead>
            <tbody>
              {tabs.map((tab, index) => {
                <tr key={index}>
                  <td>نوع المدينة</td>
                  <td> {tab.from} </td>
                </tr>;
              })}
              {tabs.map((tab, index) => {
                <tr key={index}>
                  <td>السعة</td>
                  <td> {tab.form} </td>
                </tr>;
              })}
              {tabs.map((tab, index) => {
                <tr key={index}>
                  <td>فعال</td>
                  <td> {tab.form} </td>
                </tr>;
              })}
            </tbody>
          </Table>
        </div>
      )}
      {checkbox1Checked && (
        <div className="input-group">
          <Table striped bordered hover size="sm">
            <thead>
              {tabs.map((tab, index) => {
                <tr key={index}>
                  <th>اسم التميز</th>
                  <th> {tab.from} </th>
                </tr>;
              })}
            </thead>
            <tbody>
              {tabs.map((tab, index) => {
                <tr key={index}>
                  <td>نوع المدينة</td>
                  <td> {tab.from} </td>
                </tr>;
              })}
              {tabs.map((tab, index) => {
                <tr key={index}>
                  <td>السعة</td>
                  <td> {tab.form} </td>
                </tr>;
              })}
              {tabs.map((tab, index) => {
                <tr key={index}>
                  <td>فعال</td>
                  <td> {tab.form} </td>
                </tr>;
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TypesOfLivings;
