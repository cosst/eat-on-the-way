import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
))

class Maps extends React.Component {
    render() {
        return (
          <div>
            <div className='map'>
              <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCPcB6MlGOtJzRQdQ34M3PJ3loC3UN9a6s&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `250px`, width: `250px`, margin: `0 auto` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                name={this.props.name}
                lat={this.props.lat}
                lng={this.props.lng}
              />
            </div>
            <div className='address-preview'>
              {this.props.name}
            </div>
          </div>
        )
    }
}

module.exports = Maps;