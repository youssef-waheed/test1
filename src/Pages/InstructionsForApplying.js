import React, { useState, useEffect } from 'react';
import InstructionsList from './InstructionsList';
import InstructionForm from './InstructionForm';
import './Instruction.css';

const AdminPanel = () => {
  const [instructions, setInstructions] = useState([]);
  const [editingInstruction, setEditingInstruction] = useState(null);
  const [orderCounter, setOrderCounter] = useState(1);

  useEffect(() => {
    const fetchInstructionsFromDB = async () => {
      try {
        const response = await fetch('http://localhost:5000/instructions');
        const data = await response.json();

        if (data.status === 'success') {
          setInstructions(data.data.instructions);
          setOrderCounter(data.data.instructions.length + 1);
        } else {
          console.error('Error fetching instructions:', data.status);
        }
      } catch (error) {
        console.error('Error fetching instructions:', error);
      }
    };

    fetchInstructionsFromDB();
  }, [instructions]);


  const handleApiRequest = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
  
      if (!response.ok) {
        console.error('API Request Error:', data || response.statusText);
      }
  
      return data;
    } catch (error) {
      console.error('Error in handleApiRequest:', error.message);
      throw error;
    }
  };
  
  

  const addInstruction = async (newInstruction) => {
    try {
      const response = await fetch('http://localhost:5000/instructions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDYyMDExNzIsImV4cCI6NDgzNjIyMDExNzJ9.iV6q_TeUygXxwsaad0jMMx9B_ZO8_ly6KeGMmNqnkHk',  // Include the valid bearer token
        },
        body: JSON.stringify(newInstruction),
      });
  
      const data = await response.json();
  
      if (response.ok && data.status === 'success') {
        setInstructions([...instructions, { _id: data.data._id, order: orderCounter, ...newInstruction }]);
        setOrderCounter(orderCounter + 1);
        setEditingInstruction(null);
      } else {
        console.error('Error adding instruction:', data.status || response.statusText);
      }
    } catch (error) {
      console.error('Error adding instruction:', error.message);
    }
  };
  

  const deleteInstruction = async (instructionId) => {
    try {
      await handleApiRequest(`http://localhost:5000/instructions/${instructionId}`, {
        method: 'DELETE',
      });

      setInstructions(instructions.filter((instruction) => instruction._id !== instructionId));
    } catch (error) {
      console.error('Error deleting instruction:', error.message);
    }
  };

  const editInstruction = (instruction) => {
    console.log('Editing Instruction:', instruction);
    setEditingInstruction(instruction);
    window.scrollTo(0, document.body.scrollHeight);
  };

  const saveChanges = async (updatedInstruction) => {
   
    console.log('Updated Instruction:', updatedInstruction);
    try {
      await handleApiRequest(`http://localhost:5000/instructions/${editingInstruction
      ._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInstruction),
      });
  
      setInstructions(
        instructions.map((inst) => (inst._id === updatedInstruction._id ? { ...inst, ...updatedInstruction } : inst))
      );
      setEditingInstruction(null);
    } catch (error) {
      console.error('Error updating instruction:', error.message);
    }
  };
  

  const cancelEdit = () => {
    setEditingInstruction(null);
  };

  return (
    <div>
      <h1>التعليمات</h1>
      <InstructionsList instructions={instructions} onDelete={deleteInstruction} onEdit={editInstruction} />
      <InstructionForm onSubmit={editingInstruction ? saveChanges : addInstruction} onCancel={cancelEdit} editedInstruction={editingInstruction} />
    </div>
  );
};

export default AdminPanel;