import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const MapComponent = ({ initialCoordinates }) => {//takes the zipcode from maps.jsx 
  const [markers, setMarkers] = useState([]);
  const [pathCoordinates, setPathCoordinates] = useState([initialCoordinates]);
  const [editingIndex, setEditingIndex] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    setPathCoordinates([initialCoordinates]);
  }, [initialCoordinates]);

  const getPlaceNameAndAddress = async (lat, lng) => { //Only gets the address of the marker. Does not get the name!
    if (typeof google === 'undefined' || !google.maps) {
      console.error("Google Maps not loaded");
      return { address: '' };
    }

    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          const address = results[0].formatted_address;
          resolve({ address });
        } else {
          reject("Address not found");
        }
      });
    });
  };

  const handleMapClick = async (e) => {//Click of the map creates the marker 
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      address: "", 
      name: "", 
    };

    try {
      const { address } = await getPlaceNameAndAddress(newMarker.lat, newMarker.lng);
      newMarker.address = address;

      const updatedMarkers = [...markers, newMarker];
      setMarkers(updatedMarkers);
      setPathCoordinates(updatedMarkers.map(marker => ({
        lat: marker.lat,
        lng: marker.lng
      })));
      setEditingIndex(updatedMarkers.length - 1); // input boxes to edit the marker 
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMarker = (index) => { //Handles the delete button 
    const newMarkers = markers.filter((_, i) => i !== index);
    setMarkers(newMarkers);
    setPathCoordinates(newMarkers.map(marker => ({
      lat: marker.lat,
      lng: marker.lng,
    })));
  };

  const handleNameChange = (index, value) => { //Handles edit button 
    const updatedMarkers = [...markers];
    updatedMarkers[index].name = value;
    setMarkers(updatedMarkers);
  };

  const handleAddressChange = (index, value) => {
    const updatedMarkers = [...markers];
    updatedMarkers[index].address = value;
    setMarkers(updatedMarkers);
  };

  const handleSave = (index) => {
    setEditingIndex(null); // Save the input or edit and get rid of the input box 
  };

  const handleEdit = (index) => {
    setEditingIndex(index); // Bring back the input box to edit 
  };

  const handleKeyPress = (e, index) => { //Enter Key also saves the input 
    if (e.key === 'Enter') {
      handleSave(index); 
    }
  };

  return (
    <div> 
      <GoogleMap //Google maps style: markers, polyline, icons 
        mapContainerStyle={containerStyle}  
        center={pathCoordinates[0] || initialCoordinates}
        zoom={12}
        onClick={handleMapClick}
        onLoad={(map) => (mapRef.current = map)}
      >
        {markers.map((marker, index) => {
          const markerIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#FF0000",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#FFFFFF",
          };

          return (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={index === 0 ? "Start" : `${index + 1}`}
              label={{
                text: index === 0 ? "Start" : `${index + 1}`,
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'black',
              }}
              icon={markerIcon}
              onClick={() => deleteMarker(index)}
            />
          );
        })}
        <Polyline
          path={pathCoordinates}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>

      {/* Table to show user their markers */}
      <div className="marker-table" style={{ marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left' }}>Stop</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Clue or Place</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Address</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {markers.map((marker, index) => (
              <tr key={index}>
                {/* Stops Column*/}
                <td style={{ padding: '8px', textAlign: 'left' }}>
                  {index === 0 ? "Start" : `Stop ${index + 1}`}
                </td>
                <td style={{ padding: '8px', textAlign: 'left' }}>
                  {/* Clue or Place  column */}
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={marker.name || ''}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      placeholder="Give a clue or say what place it is"
                      style={{
                        border: '1px solid #ccc',
                        padding: '5px',
                        width: '100%',
                        boxSizing: 'border-box',
                        fontWeight: 'bold',
                        color: '#333',
                      }}
                    />
                  ) : (
                    <span>{marker.name || 'No clue or place provided'}</span>
                  )}
                </td>
                <td style={{ padding: '8px', textAlign: 'left' }}>
                  {/* Address Column*/}
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={marker.address || ''}
                      onChange={(e) => handleAddressChange(index, e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      placeholder="Address will be filled in automatically"
                      style={{
                        border: '1px solid #ccc',
                        padding: '5px',
                        width: '100%',
                        boxSizing: 'border-box',
                        fontWeight: 'bold',
                        color: '#333',
                      }}
                    />
                  ) : (
                    <span>{marker.address || 'Address not available'}</span>
                  )}
                </td>
                <td style={{ padding: '8px', textAlign: 'left' }}>
                  {editingIndex === index ? (
                    <button onClick={() => handleSave(index)}
                     style={{ 
                      padding: '5px 15px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      backgroundColor: '#4CAF50', // Green for save
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                       }}>
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(index)}
                    style={{ 
                      padding: '5px 15px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      backgroundColor: '#008CBA', // Blue for edit
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                       }}>
                      Edit
                    </button>
                  )}
                  <button 
                  onClick={() => deleteMarker(index)} 
                  style={{ 
                    padding: '5px 15px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: '#f44336', // Red for delete
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px', 
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MapComponent;
