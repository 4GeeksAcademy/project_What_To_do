import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = `https://api.foursquare.com/v3/places/search`;
const API_KEY = `fsq36n4VDirwVjuExOsAhVU+3oLweispAYAg5bmsTeT9gUg=`;

export const Activity = () => {
    const [result, setResult] = useState({});
    const { id } = useParams();

    return (
        <h1>
            {id}
        </h1>
    )
}