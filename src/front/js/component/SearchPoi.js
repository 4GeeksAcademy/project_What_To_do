import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = `https://api.foursquare.com/v3/places/search`;
const API_KEY = `fsq36n4VDirwVjuExOsAhVU+3oLweispAYAg5bmsTeT9gUg=`;


export const SearchPOI = ({ responseData, setResponseData, searchInput, clickSearch, setClickSearch }) => {
  const [latlong, setLatlong] = useState('');

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (response) => {
          setLatlong(`${response.coords.latitude},${response.coords.longitude}`);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    getLocation();
  }, []);


  const getVenues = (query) => {
    const endPoint = `${API_URL}?`;
    const params = {
      client_id: "RQW2HIVJZHJUW2PCEWJZX0OSBX10EIIDU2AJPILYO1YSX3FV",
      client_secret: "UGVVL3THNN2CUMPB55JHSUCDFQMGX5NJVQH5INROHREEE3F1",
      ll: latlong,
      query: query,
      v: "20182507"
    };
    axios.get(endPoint + new URLSearchParams(params), {
      headers: { 'Authorization': API_KEY }
    })
    .then(response => {
      const { data } = response;
      if (data && data.results && data.results.length > 0) {
        const places = data.results;
        setResponseData(
          places.map((place) => { 
          return {

            name: place.name,
            address: place.location.formatted_address,
            id: place.fsq_id,
            category: place.categories.length > 0 ? place.categories[0].name : "Unknown Category"
            // description = 
          }})
        );
      } else {
        console.warn('No place found');
        setResponseData([]); // Clear previous data if no places found
      }
      
    })
    .catch(error => {
      console.error('Error fetching place data:', error);
    });
  };

  console.log(responseData)

  useEffect(() => {
    if(latlong && !clickSearch) {
      getVenues('coffee')
    }
  },[latlong]);

  useEffect(() => {
    if (latlong && clickSearch) {
      getVenues(searchInput); // Fetch venues based on current location when latlong changes
      setClickSearch(false);
    }
  }, [latlong, clickSearch]);

  // const handleChange = (value) => {
  //   setSearchValue(value);
  //   getVenues(value); // Fetch venues based on new input value
  // };

  return (
    <>
    {responseData.name}
    {responseData.address}
    {responseData.category}
    </>
  );
};
