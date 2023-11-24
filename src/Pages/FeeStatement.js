import React from "react";
import Table from "react-bootstrap/Table";

const FeeStatement = () => {
  return (
    <div>
      <div>
        <p
          style={{ fontWeight: "bold", textAlign: "center", color: "darkred" }}
        >
          بيان رسوم
        </p>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> الاسم</th>
            <th> عمر أشرف إسماعيل محمد</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>الرقم القومي</td>
            <td>302015230213151</td>
          </tr>

          <tr>
            <td>الكلية والفرقة </td>
            <td>جامعة حلوان - حاسبات - الفرقة الرابعة</td>
          </tr>
          <tr>
            <td>رقم شئون الطلاب </td>
            <td>011554222476</td>
          </tr>

          <tr>
            <td>العنوان </td>
            <td>شارع السودان - الجيزة</td>
          </tr>
          <tr>
            <td>نوع السكن </td>
            <td> سكن عادي </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default FeeStatement;
