import React, { useState, useEffect } from "react";
import "./Instruction.css";
import { getAuthUser } from "../helper/storage";
const auth = getAuthUser();

const InstructionForm = ({ onSubmit, onCancel, editedInstruction }) => {
  const [instruction, setInstruction] = useState({ contextOfInstructions: "" });

  useEffect(() => {
    if (editedInstruction) {
      // If an instruction is being edited, set the form content
      setInstruction({
        contextOfInstructions: editedInstruction.contextOfInstructions,
      });
    } else {
      // If not editing, reset the form content
      setInstruction({ contextOfInstructions: "" });
    }
  }, [editedInstruction]);

  const handleChange = (e) => {
    setInstruction({ ...instruction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(instruction);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        أضافة و تعديل الارشادات:
        <textarea
          name="contextOfInstructions"
          value={instruction.contextOfInstructions}
          onChange={handleChange}
        />
      </label>
      {auth && (auth.athurity === "الكل" || auth.athurity === "ادخال") && (
        <button style={{ backgroundColor: "blue" }} type="submit">
          حفظ
        </button>
      )}

      <button
        style={{ backgroundColor: "red" }}
        type="button"
        onClick={onCancel}
      >
        الغاء
      </button>
    </form>
  );
};

export default InstructionForm;
