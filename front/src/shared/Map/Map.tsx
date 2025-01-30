import React from 'react';
import { useState } from 'react';
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "./Map.css";
import { MapPanel } from '../MapPanel/MapPanel';
import { useMap } from 'react-leaflet';

export const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState<LatLngTuple>([51.505, -0.09]);

  const handleCitySelection = ([lat, lon]: LatLngTuple): void => {
    setCoordinates([lat, lon]);
  }

  // Component to handle map click events
  const LocationMarker: React.FC = () => {
    const map = useMap();

    useMapEvents({
      click(e) {
        setCoordinates([e.latlng.lat, e.latlng.lng]);
      }
    });

    useEffect(() => {
      map.flyTo(coordinates, 13); // Change la vue au changement de position
    }, [coordinates, map]);

    return (
      <Marker position={coordinates}>
        <Popup>
          You clicked here: <br /> Latitude: {coordinates[0]}, Longitude: {coordinates[1]}
        </Popup>
      </Marker>
    );
  };

  return (
    <div className="map relative">
      <MapPanel
        onCitySelection={handleCitySelection}
      />
      <MapContainer
        center={coordinates}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        className='z-0'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />

      </MapContainer>
    </div>
  );
};
