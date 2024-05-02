import React from 'react';

const InstructionsList = ({ instructions, onDelete, onEdit }) => {
    return (
      <div>
{instructions.map((instruction) => (
        instruction.contextOfInstructions && (
          <div key={instruction._id}>
            <ul>
              <li>
                <div>{instruction.contextOfInstructions}</div>
                <div>
                  <button onClick={() => onEdit(instruction)}>Edit</button>
                  <button onClick={() => onDelete(instruction._id)}>Delete</button>
                </div>
              </li>
            </ul>
          </div>
        )
      ))}
      </div>
    );
  };
export default InstructionsList;
