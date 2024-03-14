import React, { useState, useEffect }  from "react";
import "./Social.css";

const SocialResearch = () => {
  const [parentChecked, setParentChecked] = useState(false);
  const [childChecked, setChildChecked] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
  });

  useEffect(() => {
    const areAllChecked = Object.values(childChecked).every((val) => val);
    setParentChecked(areAllChecked);
  }, [childChecked]);

  const handleParentChange = (event) => {
    const isChecked = event.target.checked;
    setParentChecked(isChecked);
    setChildChecked({
      checkbox1: isChecked,
      checkbox2: isChecked,
      checkbox3: isChecked,
      checkbox4: isChecked,
      checkbox5: isChecked,
    });
  };

  const handleChildChange = (event) => {
    const { name, checked } = event.target;
    setChildChecked({
      ...childChecked,
      [name]: checked,
    });
  };

  return (
   
    <div className="two-column-wrapper">
      <div className="col">
      <label>
          <input
            type="checkbox"
        //    checked={filters.oldStudent}
        //    onChange={() => handleCheckboxChange("oldStudent")}
          />{" "}
          قديم
        </label>
        <label>
          <input
            type="checkbox"
          //  checked={filters.newStudent}
          //  onChange={() => handleCheckboxChange("newStudent")}
          />{" "}
          جديد
        </label>
        <p>___________________</p>
       <div className="check">
         <label>    <input
        type="checkbox"
        id="parentCheckbox"
        checked={parentChecked}
        onChange={handleParentChange}
      />{" "}حالة خاصة
      </label>
        </div>
      <div>
      <label><input
          type="checkbox"
          id="checkbox1"
          name="checkbox1"
          checked={childChecked.checkbox1}
          onChange={handleChildChange}
        />{" "}بعد المسافة</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="checkbox2"
          name="checkbox2"
          checked={childChecked.checkbox2}
          onChange={handleChildChange}
        />
        {" "}انفصال</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="checkbox3"
          name="checkbox3"
          checked={childChecked.checkbox3}
          onChange={handleChildChange}
        />
         {" "}وفاة</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="checkbox4"
          name="checkbox4"
          checked={childChecked.checkbox4}
          onChange={handleChildChange}
        />
          {" "}اجتماعي</label>
      </div>
      <div>
      <label> <input
          type="checkbox"
          id="checkbox5"
          name="checkbox5"
          checked={childChecked.checkbox5}
          onChange={handleChildChange}
        />
        {" "}مرضي</label>
      </div>
      <input
          type="text"
          placeholder="Search by name or national ID"
          //value={filter}
         // onChange={(e) => setFilter(e.target.value)}
        />
        </div>
        <div  className="coll">

        </div>
      
    </div>
  );
};

export default SocialResearch;
