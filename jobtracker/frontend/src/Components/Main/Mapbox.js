import React, { Fragment, useEffect, useContext, useRef } from "react";
import "./map.css";
import { AppContext } from "../Common/AppContext";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const defaultMapValues = {
  lng: -98.35,
  lat: 39.5,
  zoom: 2,
};

export default function Mapbox() {
  const { data } = useContext(AppContext);
  let { jobs, locations } = data;
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      center: [defaultMapValues.lng, defaultMapValues.lat],
      style: "mapbox://styles/mapbox/light-v10",
      zoom: defaultMapValues.zoom,
    });

    map.on("load", () => {
      addMarker();
    });

    function addMarker() {
      jobs.map((job) => {
        if (job.location !== null && locations.length !== null) {
          let curLocation = locations.find(
            (location) => location.id === job.location
          );
          let lat = curLocation.latitude;
          let lng = curLocation.longitude;
          var popup = getPopup(job.title);
          addMarkerToMap([lng, lat], popup);
        }
      });
    }

    function getPopup(title) {
      return new mapboxgl.Popup({
        offset: 25,
        closeOnMove: true,
        closeButton: false,
      }).setText(title);
    }

    function addMarkerToMap(coordinates, popup) {
      new mapboxgl.Marker(createDivElement())
        .setLngLat(coordinates)
        .addTo(map)
        .setPopup(popup);
    }

    function createDivElement() {
      var element = document.createElement("div");
      element.className = "marker";
      element.style.backgroundImage = "url(/static/job.png)";
      return element;
    }

    return () => map.remove();
  }, [jobs, locations]);

  return (
    <Fragment>
      <div ref={mapContainer} className="mapContainer" />
    </Fragment>
  );
}
