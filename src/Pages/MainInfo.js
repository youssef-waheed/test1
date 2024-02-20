import React, { useState } from "react";

const MainInfo = () => {
  const [isDivVisible, setIsDivVisible] = useState(false);

  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
  };
  const [textInput, setTextInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // manage el form
  };

  return (
    <div>
      <div>
        <button
          onClick={toggleDiv}
          className="button"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          إضافة
        </button>
        {isDivVisible && (
          <div style={{ fontWeight: "bold" }}>
            <form onSubmit={handleSubmit} style={formStyle}>
              <label style={labelStyle}>
                الرقم القومي :
                <input
                  type="text"
                  value={textInput}
                  onChange={handleTextChange}
                  style={inputStyle}
                />
              </label>

              <label style={labelStyle}>
                Checkbox:
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  style={checkboxStyle}
                />
              </label>

              <label style={labelStyle}>
                Dropdown:
                <select
                  value={selectedOption}
                  onChange={handleDropdownChange}
                  style={selectStyle}
                >
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </label>

              <input type="submit" value="Submit" style={buttonStyle} />
            </form>
          </div>
        )}
            
      </div>{" "}
    </div>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "right",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  backgroundColor: "#f9f9f9",
};

const labelStyle = {
  marginBottom: "10px",
};

const inputStyle = {
  padding: "8px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  width: "200px",
};

const checkboxStyle = {
  margin: "5px",
};

const selectStyle = {
  padding: "8px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  width: "200px",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
export default MainInfo;
