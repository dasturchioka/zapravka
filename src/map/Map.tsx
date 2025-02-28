import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import data from "@/data/data.json";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { MapInfoSheet } from ".";
import { searchStore } from "@/search/store/searchStore";

function MapUpdater({ chosenStation }: { chosenStation: any }) {
  const map = useMap();

  useEffect(() => {
    if (chosenStation) {
      const { latitude, longitude } = chosenStation.coordinates;
      map.setView([parseFloat(latitude), parseFloat(longitude)], 14, {
        animate: true,
      });
    }
  }, [chosenStation, map]);

  return null;
}

export default function Map() {
  const [selectedStation, setSelectedStation] = useState<any>(null);

  const chosenStation = searchStore((state: any) => state.chosenStation);
  const setChosenStation = searchStore((state: any) => state.setChosenStation);

  const activeStation = chosenStation || selectedStation;

  const handlerStation = (station: object) => {
    setChosenStation(station);
    setSelectedStation(station);
  };

  const customMarker = new L.Icon({
    iconUrl: "/images/icons/marker.webp",
    iconSize: [37, 37],
    iconAnchor: [12, 37],
    popupAnchor: [0, -37],
  });

  const chosenMarker = new L.Icon({
    iconUrl: "/images/icons/red_marker.webp",
    iconSize: [50, 50],
    iconAnchor: [12, 50],
    popupAnchor: [0, -50],
  });

  const closeInfoSheet = () => {
    setSelectedStation(null);
    setChosenStation(null);
  };

  return (
    <>
      <MapContainer
        center={[41.319258, 69.298395]}
        zoom={14}
        scrollWheelZoom={true}
        className="w-screen h-screen relative z-10"
        zoomControl={false}
      >
        <MapUpdater chosenStation={chosenStation} />
        <TileLayer
          attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of Humanitarian OpenStreetMap Team'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          subdomains={["a", "b", "c"]}
        />
        {data.map((station) => (
          <Marker
            position={[
              parseFloat(station.coordinates.latitude),
              parseFloat(station.coordinates.longitude),
            ]}
            icon={activeStation === station ? chosenMarker : customMarker}
            eventHandlers={{
              click: () => handlerStation(station),
            }}
            key={station.id}
          />
        ))}
      </MapContainer>
      {activeStation && (
        <MapInfoSheet item={activeStation} onClose={closeInfoSheet} />
      )}
    </>
  );
}
