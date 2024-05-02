// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UsersInstruction = () => {
//   const [instructions, setInstructions] = useState([]);

//   useEffect(() => {
//     const fetchInstructions = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/instructions');
//         setInstructions(response.data.data.instructions);
//       } catch (error) {
//         console.error('Error fetching instructions:', error.message);
//       }
//     };

//     fetchInstructions();
//   }, []);

//   const downloadPdf = async (id, fileName) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/instructions/download/${id}`, {
//         responseType: 'blob',
//       });

//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', fileName + '.pdf');
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Error downloading PDF:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>التعليمات</h1>
//       {instructions.map(instruction => (
//             instruction.contextOfInstructions && (
//               <div key={instruction._id}>
//                 <ul>
//                   <li>
//                     <div>{instruction.contextOfInstructions}</div>
//                     </li>
//                     </ul>
//                     </div>)
//       ))}
//        <div>
//            {instructions.map(instruction => (
//             instruction.avatar && (
//                  <div key={instruction._id}>
          
//           <embed src={`http://localhost:5000/instructions/download/${instruction._id}`} type="application/pdf" width="600" height="400" />
//           <button onClick={() => downloadPdf(instruction._id, instruction.title)}><h2>{instruction.avatar}</h2></button>
//         </div>
//       )))}
//        </div>
    
//     </div>
//    );
// };

// export default UsersInstruction;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersInstruction = () => {
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/instructions');
        setInstructions(response.data.data.instructions);
      } catch (error) {
        console.error('Error fetching instructions:', error.message);
      }
    };

    fetchInstructions();
  }, []);

  const downloadPdf = async (id, fileName) => {
    try {
      const response = await axios.get(`http://localhost:5000/instructions/download/${id}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName + '.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error.message);
    }
  };

  return (
    <div>
      <h1>التعليمات</h1>
      {instructions.map(instruction => (
        <div key={instruction._id}>
          {instruction.contextOfInstructions && (
            <p>{instruction.contextOfInstructions}</p>
         
         )}
         </div>
          
      ))}
      <div>
      <h1>قم بتنزيل المرفقات</h1>
      {instructions.map(instruction => (
        <div key={instruction._id}>{instruction.avatar && (
            <div>
                
              <button onClick={() => downloadPdf(instruction._id, instruction.avatar)}>
              <h2>{instruction.avatar}</h2></button>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default UsersInstruction;
