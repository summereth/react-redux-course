import React from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function Map() {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const lat = query.get("lat");
  const lng = query.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button onClick={() => setQuery({ lat: 23, lng: 50 })}>
        Change position
      </button>
    </div>
  );
}

export default Map;
