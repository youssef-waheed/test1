import { React, useState } from "react";
import Checkbox from "../Shared/Checkbox";
import { TextField, Button } from "@material-ui/core";
import "../Style/SubmitApplication.css";

const SubmitApplication = () => {
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [dropdownValue2, setDropdown2Value] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");

  const handleCheckbox1Change = () => {
    setCheckbox1Checked(!checkbox1Checked);
    setCheckbox2Checked(false);
  };

  const handleCheckbox2Change = () => {
    setCheckbox2Checked(!checkbox2Checked);
    setCheckbox1Checked(false);
  };

  const handleDropdown2Change = (event) => {
    setDropdown2Value(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  return (
    <div className="container">
      <div className="input-group">
        <Checkbox
          label="مصري"
          checked={checkbox1Checked}
          onChange={handleCheckbox1Change}
        />
        <Checkbox
          label="وافد"
          checked={checkbox2Checked}
          onChange={handleCheckbox2Change}
        />
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>الرقم القومي</p>

        <TextField label="الرقم القومي" variant="outlined" size="small" />
        <p style={{ marginLeft: "10px", marginRight: "170px" }}>كود الطالب</p>
        <TextField label="كود الطالب" variant="outlined" size="small" />
      </div>

      <div className="input-group">
        <TextField label="الاسم رباعي" variant="outlined" fullWidth />
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>تاريخ الميلاد</p>
        <TextField label="التاريخ " variant="outlined" size="small" />
        <p style={{ marginLeft: "10px", marginRight: "170px" }}>محل الميلاد</p>
        <TextField label="محل الميلاد" variant="outlined" size="small" />
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>النوع</p>
        <select value={dropdownValue} onChange={handleDropdownChange}>
          <option value="option1">ذكر</option>
          <option value="option2">أنثي</option>
        </select>

        <p style={{ marginLeft: "10px", marginRight: "170px" }}>الديانة</p>
        <select value={dropdownValue2} onChange={handleDropdown2Change}>
          <option value="option1">مسلم</option>
          <option value="option2">مسيحي</option>
          <option value="option3">اخري</option>
        </select>
      </div>

      <div className="input-group">
        <TextField
          label="محل الاقامة 'العنوان بالتفصيل' "
          variant="outlined"
          fullWidth
        />
      </div>

      <div className="input-group">
        <TextField label="البريد الالكتروني" variant="outlined" fullWidth />
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>التليفون الارضي</p>
        <TextField label="الرقم " variant="outlined" size="small" />
        <p style={{ marginLeft: "10px", marginRight: "170px" }}>
          الهاتف المحمول
        </p>
        <TextField label="الرقم" variant="outlined" size="small" />
      </div>
      <div className="input-group">
        <TextField label="اسم الاب رباعي" variant="outlined" fullWidth />
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>الرقم القومي للاب</p>

        <TextField label="الرقم القومي" variant="outlined" size="small" />
        <p style={{ marginLeft: "10px", marginRight: "40px" }}>وظيفة الاب</p>
        <TextField label="الوظيفة " variant="outlined" size="small" />
        <p style={{ marginLeft: "10px", marginRight: "40px" }}>تليفون الاب</p>
        <TextField label=" الرقم" variant="outlined" size="small" />
      </div>

      <div className="input-group">
        <TextField label="اسم ولي الامر رباعي" variant="outlined" fullWidth />
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>رقم القومي لولي الامر</p>
        <TextField label="الرقم " variant="outlined" size="small" />
        <p style={{ marginLeft: "10px", marginRight: "170px" }}>
          صلة ولي الامر
        </p>
        <TextField label="الصلة" variant="outlined" size="small" />
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>الكلية</p>
        <TextField label="الكلية " variant="outlined" size="small" />
        <p style={{ marginLeft: "10px", marginRight: "170px" }}>الفرقة</p>
        <TextField label="الفرقة" variant="outlined" size="small" />
      </div>

      <Button variant="contained" color="primary">
        التقديم للمدن
      </Button>
    </div>
  );
};

export default SubmitApplication;
