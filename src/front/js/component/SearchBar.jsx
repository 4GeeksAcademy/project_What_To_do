import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';

// import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
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
      }).then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
      }).catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};