import React from 'react';

const InstructionsList = ({ instructions, onDelete, onEdit }) => {
    return (
      <ul>
        {instructions.map((instruction) => (
          <li key={instruction._id}>
            <div>{instruction.contextOfInstructions}</div>
            <div>
              <button onClick={() => onEdit(instruction)}>Edit</button>
              <button onClick={() => onDelete(instruction._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
export default InstructionsList;
