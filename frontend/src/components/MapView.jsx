import React, { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, Marker, Popup, useMap } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {UpdatePosition} from "../../wailsjs/go/main/App.js";

function MapView() {
    const [lat, setLat] = useState(2.32);
    const [lon, setLon] = useState(4.67);
    const zoomLevel = 4;

    const currentLocationMarker = new DivIcon({
        className: 'custom-marker-icon',
        html: `
        <div style="background-color: #d8cf1a; width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 15px 5px rgba(230,236,73,0.98), 0 0 20px 10px rgba(227,232,93,0.98);">
            <div style="width: 100%; height: 100%; border: 1px solid white; border-radius: 50%; opacity: 0.5"></div>
        </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    });


    const updateLocation = () => {
        UpdatePosition()
            .then(response => {
                console.log("lat and lon: ", response)
                setLat(response[0]);
                setLon(response[1]);
            })
            .catch(error => {
                console.error("error getting backend", error);
            });
    };

    return (
        <MapContainer
            center={[lat, lon]}
            zoom={zoomLevel}
            scrollWheelZoom={true}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            />
            <Marker
                position={[lat, lon]}
                icon={currentLocationMarker}
            >
                <Popup>
                    <strong>Latitude:</strong> {lat}<br />
                    <strong>Longitude:</strong> {lon}<br />
                </Popup>
            </Marker>
            <ZoomControl position="topright" />
            <button
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 1000,
                    backgroundColor: 'black',
                    padding: '5px 10px',
                    border: 'none',
                    color:'white',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onClick={updateLocation}
            >
                Update Location
            </button>
        </MapContainer>
    );
}

export default MapView;
