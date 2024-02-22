import React, { useState } from 'react';

const Page1 = () => (
  <div>
    <h2>Page 1</h2>
    <p>This is the content for Page 1</p>
  </div>
);

const Page2 = () => (
  <div>
    <h2>Page 2</h2>
    <p>This is the content for Page 2</p>
  </div>
);

const Page3 = () => (
  <div>
    <h2>Page 3</h2>
    <p>This is the content for Page 3</p>
  </div>
);

const ButtonDisplay = ({ buttons, handleClick }) => (
  <div>
    <h2>Buttons</h2>
    {buttons.map((button, index) => (
      <button key={index} onClick={() => handleClick(button.page)}>
        {button.text}
      </button>
    ))}
  </div>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const buttons = [
    { text: 'Page 1', page: <Page1 /> },
    { text: 'Page 2', page: <Page2 /> },
    { text: 'Page 3', page: <Page3 /> },
  ];

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ButtonDisplay buttons={buttons} handleClick={handleClick} />
      {currentPage}
    </div>
  );
};

export default App;
