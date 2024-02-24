// import React, { useState } from 'react';
// import Building from './Building';
// import Floor from './Floor';
// import Room from './Room';
// import City from './UniversityCity';

// const Tskeen = () => {
//   const [selectedBuilding, setSelectedBuilding] = useState(null);
//   const [selectedFloor, setSelectedFloor] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);

//   const handleSelectBuilding = (buildingId) => {
//     setSelectedBuilding(buildingId);
//     setSelectedFloor(null);
//   };

//   const handleSelectFloor = (floorId) => {
//     setSelectedFloor(floorId);
//   };

//   const handleSelectCity = (cityId) => {
//     setSelectedCity(cityId);
//     setSelectedBuilding(null);
//     setSelectedFloor(null);
//   };

//   return (
//     <div className="tskeen-container">
//       <div className="sidebar">
//         <City onSelectCity={handleSelectCity} />
//       </div>
//       <div className="main-content">
//         <div className="building-floor">
//           <Building onSelectBuilding={handleSelectBuilding} selectedCity={selectedCity} />
//           {selectedBuilding && <Floor buildingId={selectedBuilding} onSelectFloor={handleSelectFloor} />}
//         </div>
//         <div className="room">
//           {selectedFloor && <Room floorId={selectedFloor} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tskeen;

import React, { useState } from "react";
import City from "./UniversityCity";
import Building from "./Building";
import Floor from "./Floor";
import Room from "./Room";

const Tskeen = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);

  const handleSelectCity = (cityId) => {
    setSelectedCity(cityId);
    setSelectedBuilding(null);
    setSelectedFloor(null);
  };

  const handleSelectBuilding = (buildingId) => {
    setSelectedBuilding(buildingId);
    setSelectedFloor(null);
  };

  const handleSelectFloor = (floorId) => {
    setSelectedFloor(floorId);
  };

  return (
    <div className="tskeen-container">
      <div className="sidebar">
        <City onSelectCity={handleSelectCity} />
        {selectedCity && (
          <Building
            onSelectBuilding={handleSelectBuilding}
            selectedCity={selectedCity}
          />
        )}
        {selectedBuilding && (
          <Floor
            buildingId={selectedBuilding}
            onSelectFloor={handleSelectFloor}
          />
        )}
        {selectedFloor && <Room floorId={selectedFloor} />}
      </div>
    </div>
  );
};

export default Tskeen;
