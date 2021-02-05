import React, { Fragment, useEffect, useContext, useRef } from "react";
import "./map.css";
import { AppContext } from "../Common/AppContext";
import mapboxgl from "mapbox-gl";
import useJobs from "../Jobs/useJobs";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const defaultMapValues = {
  lng: -98.35,
  lat: 39.5,
  zoom: 2,
};

export default function Mapbox() {
  const { token } = useContext(AppContext);
  const jobs = useJobs(token);
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      center: [defaultMapValues.lng, defaultMapValues.lat],
      style: "mapbox://styles/mapbox/light-v10",
      zoom: defaultMapValues.zoom,
    });

    map.on("load", () => {
      if (jobs) {
        addMarker();
      }
    });

    function addMarker() {
      jobs.forEach((job) => {
        let lat = job.Location.latitude;
        let lng = job.Location.longitude;
        var popup = getPopup(job.title);
        addMarkerToMap([lng, lat], popup);
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
      return element;
    }

    return () => map.remove();
  }, [jobs]);

  return (
    <Fragment>
      <div ref={mapContainer} className="mapContainer" />
    </Fragment>
  );
}
