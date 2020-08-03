import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLocations } from "../../../actions/locations";
import { getJobs } from "../../../actions/jobs";
import mapboxgl from "mapbox-gl";
import "./map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamVldmFuamFjb2Jqb2huIiwiYSI6ImNrYng0dzQwaTBtYnYydG9iZHd2ZGMwdzMifQ.tibdKDL-t805Ha1GawouUA";

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -98.35,
      lat: 39.5,
      zoom: 2,
    };
  }

  static propTypes = {
    jobs: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    getJobs: PropTypes.func.isRequired,
    getLocations: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getJobs();
    this.props.getLocations();
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [this.state.lng, this.state.lat],
      style: "mapbox://styles/mapbox/light-v10",
      zoom: this.state.zoom,
    });
  }

  render() {
    return (
      <div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
  locations: state.locations.locations,
});

export default connect(mapStateToProps, { getJobs, getLocations })(MapBox);
