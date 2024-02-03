import React, { useState, useEffect } from 'react';

const API_URL = 'https://api.foursquare.com/v3/places/search';
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Replace with your actual Foursquare API access token

export const SearchPOI = () => {
  const [venueData, setVenueData] = useState({});
  const [latlong, setLatlong] = useState('');

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (response) => {
          setLatlong(`${response.coords.latitude},${response.coords.longitude}`);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    };
    getLocation();
  }, []);

  const placeSearch = async (query) => {
    try {
      if (latlong) {
        const searchParams = new URLSearchParams({
          ll: latlong,
          query,
          open_now: 'true',
          sort: 'DISTANCE',
          client_id: 'RQW2HIVJZHJUW2PCEWJZX0OSBX10EIIDU2AJPILYO1YSX3FV',
          client_secret: 'UGVVL3THNN2CUMPB55JHSUCDFQMGX5NJVQH5INROHREEE3F1',
          v: '20182507',
          oauth_token: ACCESS_TOKEN,
        });

        const response = await fetch(`${API_URL}?${searchParams}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          }
        });

        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error fetching venue data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await placeSearch('coffee');
        setVenueData(data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    if (latlong) {
      fetchVenues();
    }
  }, [latlong]);

  return (
    <div>
      <h2>Venue Name: {venueData.name}</h2>
      {/* Display other venue details as needed */}
    </div>
  );
};
