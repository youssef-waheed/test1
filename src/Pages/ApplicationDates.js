import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/NewAppDate.css";
import { getAuthUser } from "../helper/storage";
const auth = getAuthUser();

const ApplicationDates = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/generalTiming/getAllDate",
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDates(response.data.data.date);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="application-dates">
      <h1>مواعيد التقديم</h1>
      <table>
        <thead>
          <tr>
            <th>الفئة</th>
            <th>من</th>
            <th>إلى</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date, index) => (
            <tr key={index}>
              <td>{date.forWho}</td>
              <td>{new Date(date.from).toLocaleDateString()}</td>
              <td>{new Date(date.to).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationDates;
