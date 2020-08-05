import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLocations } from "../../../actions/locations";
import { getJobs } from "../../../actions/jobs";
import mapboxgl from "mapbox-gl";
import "./map.css";
import jobs from "../../../reducers/jobs";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -98.35,
      lat: 39.5,
      zoom: 2,
    };
  }

  map;

  componentDidMount() {
    this.props.getJobs();
    this.props.getLocations();

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [this.state.lng, this.state.lat],
      style: "mapbox://styles/mapbox/light-v10",
      zoom: this.state.zoom,
    });

    this.map.on("load", () => {
      let { jobs, locations } = this.props;
      if (jobs && locations) {
        this.addMarker(jobs, locations);
      }
    });
  }

  getPopup(title) {
    return new mapboxgl.Popup({
      offset: 25,
      closeOnMove: true,
      closeButton: false,
    }).setText(title);
  }

  addMarker(jobsArray, locationsArray) {
    jobsArray.map((job) => {
      if (job.location !== null && locationsArray.length > 0) {
        let curLocation = locationsArray.find(
          (location) => location.id === job.location
        );
        let lat = curLocation.latitude;
        let lng = curLocation.longitude;
        var popup = this.getPopup(job.title);
        this.addMarkerToMap([lng, lat], popup);
      }
    });
  }

  addMarkerToMap(coordinates, popup) {
    var marker = new mapboxgl.Marker(this.createDivElement())
      .setLngLat(coordinates)
      .addTo(this.map)
      .setPopup(popup);
  }

  createDivElement() {
    var element = document.createElement("div");
    element.className = "marker";
    element.style.backgroundImage = "url(/static/job.png)";
    return element;
  }

  render() {
    let { jobs, locations } = this.props;
    return (
      <Fragment>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
  locations: state.locations.locations,
});

export default connect(mapStateToProps, { getJobs, getLocations })(MapBox);
