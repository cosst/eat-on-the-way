import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 34.0477772, lng: -118.2366288 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 34.0477772, lng: -118.2366288 }} />}
  </GoogleMap>
))

class Maps extends React.Component {
    render() {
        return (
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC5sVlO2j-O0C5WbH6_hOBa0GpRVPHioq0&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `250px`, width: `250px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        )
    }
}
// const MyMapComponent = (props) => {
//   return (
//     <div>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//   </GoogleMap>

// <MyMapComponent isMarkerShown />
// </div>
// )}

module.exports = Maps;