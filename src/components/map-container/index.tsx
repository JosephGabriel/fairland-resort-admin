import { useEffect } from "react";
import { LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

interface RecenterProps {
  coordinates: LatLngTuple;
}

interface Props {
  latitude: string | undefined;
  longitude: string | undefined;
  displayName: string | undefined;
}

const Recenter = ({ coordinates }: RecenterProps) => {
  const map = useMap();

  useEffect(() => {
    map.setZoom(20);

    map.fitBounds([coordinates, coordinates], {
      padding: [100, 100],
      animate: true,
    });
  }, [coordinates, map]);

  return null;
};

export const CustomMap = ({ latitude, longitude, displayName }: Props) => {
  const coordinates = [
    parseFloat(latitude ?? "0"),
    parseFloat(longitude ?? "0"),
  ] as LatLngTuple;

  return (
    <MapContainer id="map" center={coordinates}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {displayName && (
        <>
          <Marker position={coordinates}>
            <Popup>{displayName}</Popup>
          </Marker>

          <Recenter coordinates={coordinates} />
        </>
      )}
    </MapContainer>
  );
};
