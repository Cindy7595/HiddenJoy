import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import MapComponent from './MapComponent'; 
import './Maps.css';

const Maps = () => {
  const location = useLocation();
  const { zipcode } = location.state || {}; //Get the zipcode 
  const [coordinates, setCoordinates] = useState({ lat: 41.8781, lng: 87.6298}); //If can't read the zipcode then it goes to a default area. Should be Chicago.

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD0DL2NfNm15LJMd5FQXlmKEhxkr7yTAvo', //my api key from google console 
  });

  useEffect(() => {
    if (zipcode) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyD0DL2NfNm15LJMd5FQXlmKEhxkr7yTAvo` //my api key is in the url as well 
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            const location = data.results[0].geometry.location;
            setCoordinates({ lat: location.lat, lng: location.lng });
          } else {
            console.error('Invalid zip code');
          }
        })
        .catch((error) => console.error('Error fetching coordinates:', error));
    }
  }, [zipcode]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="maps-page">
      <h1>Create the Map for your Event</h1>
      <h4>Just click on the map to mark all the stops</h4>
      <p>Displaying location for zip code: {zipcode || 'Not provided'}</p>
      <MapComponent initialCoordinates={coordinates} /> {/* MapComponent is called and is given the coordinates of the zipcode given*/}
    </div>
  );
};

export default Maps;
