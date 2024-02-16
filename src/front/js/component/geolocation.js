import React, { useEffect, useState } from 'react';

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const API_key = `da0439bd70676a29ec02d776f153f295`

//  https://api.foursquare.com/v3/places/search

export const Location = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [responseData, setResponseData] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    let finalAPIEndPoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`;

    fetch(finalAPIEndPoint)
      .then((response) => response.json())
      .then((data) => {
        // Handle the received weather data
        setResponseData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [latitude, longitude]);

  return (
    <p>{responseData.name}</p>
  );
};
