'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useAtomValue, useSetAtom } from 'jotai';
import { latLngAtom } from '../../globalState.js';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GoogleMap = ({ pins }) => {
  const midlandPosition = { lat: 35.1698072, lng: 136.885171621167 };
  const [isOpen, setIsOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const setLatLng = useSetAtom(latLngAtom);
  const latLng = useAtomValue(latLngAtom);

  console.log('🚀🚀🚀🚀 --->> ', latLng);
  return (
    <APIProvider apiKey={API_KEY}>
      <div style={{ height: '100vh', width: '100%' }}>
        <Map
          defaultZoom={18}
          defaultCenter={midlandPosition}
          onClick={(e) => setLatLng(e.detail.latLng)}
          // onCameraChanged={(ev) =>
          //   console.log(
          //     'camera changed:',
          //     ev.detail.center,
          //     'zoom:',
          //     ev.detail.zoom
          //   )
          // }
          mapId="da37f3254c6a6d1c"
        >
          <AdvancedMarker
            ref={markerRef}
            position={midlandPosition}
            onClick={() => setIsOpen(true)}
          >
            <Pin />
          </AdvancedMarker>

          {isOpen && (
            <InfoWindow
              // position={{ lat: 35.17, lng: 136.885171621167 }}
              anchor={marker}
              onCloseClick={() => setIsOpen(false)}
            >
              <p>InfoWindow</p>
            </InfoWindow>
          )}
          <PoiMarkers pins={pins} setIsOpen={setIsOpen} />
        </Map>
      </div>
    </APIProvider>
  );
};

// marker points ================================================

const PoiMarkers = (props) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);
  const handleClick = useCallback((ev) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log('marker clicked: ', ev.latLng.toString());
    map.panTo(ev.latLng);
  });
  // Initialize MarkerClusterer, if the map has changed
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update markers, if the markers array has changed
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };
  console.log('🚀🚀🚀🚀 props--->> ', props);

  return (
    <>
      {props.pins.map((pin) => (
        <AdvancedMarker
          key={pin.id}
          position={{ lat: Number(pin.latitude), lng: Number(pin.longitude) }}
          ref={(marker) => setMarkerRef(marker, pin.id)}
          clickable={true}
          onClick={() => {
            handleClick();
            props.setIsOpen(true);
          }}
        >
          <Pin
            background={'#FBBC04'}
            glyphColor={'#000'}
            borderColor={'#000'}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default GoogleMap;
