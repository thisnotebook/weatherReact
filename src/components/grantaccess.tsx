import React from 'react';

const GrantLocationAccess = ({ onClick }) => {
  return (
    <div className="sub-container grant-location-container active">
      <img src="assets/location_image.png" width="80" height="80" alt="Location Icon" />
      <p>Grant Location Access</p>
      <p>Allow Access to get weather Information</p>
      <button className="btn" onClick={onClick}>GRANT ACCESS</button>
    </div>
  );
};

export default GrantLocationAccess;
