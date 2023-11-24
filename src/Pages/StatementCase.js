import React from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const StatementCase = () => {
  return (
    <div>
      <div>
        <p
          style={{ fontWeight: "bold", textAlign: "center", color: "darkred" }}
        >
          بيان حالة
        </p>
        <p style={{ fontWeight: "bold" }}>البيانات الاساسية</p>
      </div>
      <Table striped bordered hover size="sm" style={{ lineHeight: "13px" }}>
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
            <td>النوع </td>
            <td>ذكر</td>
          </tr>
          <tr>
            <td> تاريخ الميلاد</td>
            <td>14/1/2002</td>
          </tr>
          <tr>
            <td>الديانة </td>
            <td>مسلم</td>
          </tr>
          <tr>
            <td>البريد الالكتروني </td>
            <td>omarash2020@gmail.com</td>
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
            <td>التقدير </td>
            <td>جيد</td>
          </tr>
          <tr>
            <td>العنوان </td>
            <td>شارع السودان - الجيزة</td>
          </tr>
          <tr>
            <td>الفئة </td>
            <td></td>
          </tr>
          <tr>
            <td>رقم الملف </td>
            <td></td>
          </tr>
          <tr>
            <td>البعد عن الجامعة </td>
            <td>100 كم</td>
          </tr>
          <tr>
            <td>حالة القبول </td>
            <td>مقبول تنسيق</td>
          </tr>
          <tr>
            <td>النوع </td>
            <td>ذكر</td>
          </tr>
          <tr>
            <td>بيانات ولي الأمر </td>
            <td>
              الاسم: أشرف إسماعيل - رقم البطاقة: 3020102154156465132 - الصفة: أب
              - تليفون: 0100545484
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="warning">
        <>
          {["danger"].map((variant) => (
            <Alert
              key={variant}
              variant={variant}
              style={{ textAlign: "center" }}
            >
              This is a {variant} alert—check it out!
            </Alert>
          ))}
        </>
      </div>
    </div>
  );
};

export default StatementCase;
