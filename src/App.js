import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import "./App.css";
import { useState, useEffect, useRef } from "react";

const MAX_ZOOM = 17;

function App() {
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(-121.91599);
  const [mapLatitude, setMapLatitude] = useState(37.36765);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});

  const increaseZoom = () => {
    if (mapZoom < MAX_ZOOM) {
      setMapZoom(mapZoom + 1);
    }
  };

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1);
    }
  };

  const updateMap = () => {
    map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
    map.setZoom(mapZoom);
  };

  useEffect(() => {
    let map = tt.map({
      key: "8h504Wc4AXL6OPndqhrtKf70AovVBL3V",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });
    setMap(map);
    return () => map.remove();
  }, []);
  return (
    <div className="App">
      <div ref={mapElement} className="mapDiv"></div>
      <h3>Map Controls</h3>
      <input
        type="text"
        name="latitude"
        placeholder="latitude"
        value={mapLatitude}
        onChange={(e) => setMapLatitude(e.target.value)}
      />
      <input
        type="text"
        name="longitude"
        placeholder="longitude"
        value={mapLongitude}
        onChange={(e) => setMapLongitude(e.target.value)}
      />
      
      <button onClick={decreaseZoom}>-</button>
      <div className="mapZoomDisplay">{mapZoom}</div>
      <button onClick={increaseZoom}>+</button>
      <button color="primary" onClick={updateMap}>
        Update Map
      </button>
      <div ref={mapElement} className="mapDiv"></div>
    </div>
  );
}

export default App;
