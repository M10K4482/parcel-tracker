import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './design.css';

const App = () => {
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);

  useEffect(() => {
    axios
      .get('https://my.api.mockaroo.com/orders.json?key=e49e6840')
      .then((response) => {
        setParcels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching parcels:', error);
      });
  }, []);

  const handleParcelClick = (parcel) => {
    setSelectedParcel(parcel);
  };

  const closePopup = () => {
    setSelectedParcel(null);
  };

  return (
    <div className="App">
      <h1>i'm a parcel tracker</h1>
      {!selectedParcel ? (
        <div className="parcel-grid">
          {parcels.map((parcel) => (
            <div
              key={parcel.id}
              className="parcel-item"
              onClick={() => handleParcelClick(parcel)}
            >
            <strong>Parcel ID:</strong> {parcel.parcel_id} <br />
            <strong>Sender:</strong> {parcel.sender} <br />
            <strong>ETA:</strong> {parcel.eta}
            </div>
          ))}
        </div>
      ) : (
        <div className="popup">
          <div className="popup-content">
            <h2>Parcel Details</h2>
            <p><strong>Parcel ID:</strong> {selectedParcel.id}</p>
            <p><strong>Status:</strong> {selectedParcel.status}</p>
            <p><strong>Verification required: </strong> Yes {selectedParcel.verification_required}</p>
            <p><strong>Estimated time of arrival:</strong> {selectedParcel.eta}</p>
            <p><strong>Name:</strong> {selectedParcel.user_name}</p>
            <p><strong>Phone Number:</strong> {selectedParcel.user_phone}</p>
            <p><strong>Last update:</strong> {selectedParcel.last_updated}</p>
            <p><strong>Notes:</strong> {selectedParcel.notes}</p>
            <div className="map-container">
              <iframe
                title="Google Map"
                src={`https://www.google.com/maps?q=${selectedParcel.location_coordinate_latitude},${selectedParcel.location_coordinate_longitude}&hl=es;z=14&output=embed`}
                width="100%"
                height="300px"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <button onClick={closePopup} className="close-button">
              Back to List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;