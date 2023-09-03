import { useEffect } from "react";
import { LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { NominatimResult } from "@services/api";

interface RecenterProps {
  coordinates: LatLngTuple;
}

interface Props {
  selectedAddress: NominatimResult | undefined;
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

export const CustomMap = ({ selectedAddress }: Props) => {
  const coordinates = [
    parseFloat(selectedAddress?.lat ?? "0"),
    parseFloat(selectedAddress?.lon ?? "0"),
  ] as LatLngTuple;

  return (
    <MapContainer id="map" center={coordinates}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selectedAddress && (
        <>
          <Marker position={coordinates}>
            <Popup>{selectedAddress.display_name}</Popup>
          </Marker>

          <Recenter coordinates={coordinates} />
        </>
      )}
    </MapContainer>
  );
};
