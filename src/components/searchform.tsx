import React, { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
  const [cityName, setCityName] = useState('');

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(cityName);
    setCityName('');
  };

  return (
    <form className="form-containers active" onSubmit={handleSubmit}>
      <input
        placeholder="Search for city.."
        value={cityName}
        onChange={handleChange}
        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
      />
      <button className="btn" type="submit">
        <img src="assets/search.png" width="20" height="20" alt="Search Icon" />
      </button>
    </form>
  );
};

export default SearchForm;
