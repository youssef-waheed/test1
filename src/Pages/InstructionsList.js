import React from "react";
import { getAuthUser } from "../helper/storage";
const auth = getAuthUser();
const InstructionsList = ({ instructions, onDelete, onEdit }) => {
  return (
    <div>
      {instructions.map(
        (instruction) =>
          instruction.contextOfInstructions && (
            <div key={instruction._id}>
              <ul>
                <li>
                  <div>{instruction.contextOfInstructions}</div>
                  <div>
                    {auth &&
                      (auth.athurity === "الكل" ||
                        auth.athurity === "تعديل") && (
                        <button
                          style={{ backgroundColor: "blue" }}
                          onClick={() => onEdit(instruction)}
                        >
                          تعديل
                        </button>
                      )}
                    {auth &&
                      (auth.athurity === "الكل" || auth.athurity === "حذف") && (
                        <button
                          style={{ backgroundColor: "red" }}
                          onClick={() => onDelete(instruction._id)}
                        >
                          حذف
                        </button>
                      )}
                  </div>
                </li>
              </ul>
            </div>
          )
      )}
    </div>
  );
};
export default InstructionsList;
