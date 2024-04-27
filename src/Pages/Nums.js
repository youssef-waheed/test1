import React, { useState } from 'react';

const NumberInputWithArrows = ({ value, onChange }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      onChange(value + 1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      onChange(value - 1);
    }
  };

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    onChange(newValue);
  };

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

const Nums = () => {
  const [number, setNumber] = useState(10);

  return (
    <div className="app">
    
      
      <section className="number-input">
        <NumberInputWithArrows value={number} onChange={setNumber} />
      </section>
    </div>
  );
};

export default Nums;
