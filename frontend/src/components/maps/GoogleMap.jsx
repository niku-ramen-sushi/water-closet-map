import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GoogleMap = () => (
  <APIProvider
    apiKey={API_KEY}
    onLoad={() => console.log('Maps API has loaded.')}
  >
    <Map
      defaultZoom={13}
      defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
      onCameraChanged={(ev) =>
        console.log(
          'camera changed:',
          ev.detail.center,
          'zoom:',
          ev.detail.zoom
        )
      }
      // mapId='da37f3254c6a6d1c'
    >
      {/*<PoiMarkers pois={locations} />*/}
    </Map>
  </APIProvider>
);

export default GoogleMap;
