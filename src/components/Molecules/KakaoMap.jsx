import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../hooks/useKakaoLoader';

const KakoMap = ({ latitude, longitude }) => {
  useKakaoLoader();

  return (
    <Map
      center={{
        lat: latitude,
        lng: longitude,
      }}
      style={{
        width: '100%',
        height: '450px',
      }}
      level={4}>
      <MapMarker
        position={{
          lat: latitude,
          lng: longitude,
        }}
      />
    </Map>
  );
};

export default KakoMap;
