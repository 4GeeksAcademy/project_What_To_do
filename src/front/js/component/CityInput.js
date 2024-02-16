import React, { useState } from 'react';

const LocationSelector = ({onLocationChange}) => {
  const [cityInput, setCityInput] = useState('');
  const [error, setError] = useState(null);

  const handleCityChange = (e) => {
    setCityInput(e.target.value);
  };


  const handleSearch = async () => {
    try {
      const response = await fetch (``)
      if(!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      const { lat, lon } =data[0];
      onLocationChange(lat, lon);

    } catch (error) {
      setError('City not found');
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Escribe una ciudad o área"
        value={cityInput}
        onChange={handleCityChange}
      />
      <button onClick={handleSearch}>Buscar</button>
      {error && <p>{error}</p>}
      {/* Placeholder for Google Map */}
      <div style={{ width: '100%', height: '400px', background: '#f0f0f0' }}>
        {/* Replace this with your Google Map component */}
        {/* <GoogleMap lat={latitude} lon={longitude} /> */}
      </div>
    </div>
  )
}