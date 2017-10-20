import React from 'react';
import api from '../utils/api';

class RouteTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: this.props.origin,
      destination: this.props.destination,
      duration: ''
    };
  }

  componentDidMount() {
    // Some sample data plus a helper for the DistanceMatrixService.
    const origin = this.state.origin;
    const destination = this.state.destination;
    const matrix = new google.maps.DistanceMatrixService();

    // Get distance from Google API, if server responds, call renderDetails().
    matrix.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
      }, 
      this.renderDetails.bind(this)
    );
  }
  
  renderDetails(res, status) {
    console.log(res);
    // If the request was successfull, fill our state with the distance data.
    if (status == 'OK') {
      this.setState({
        origin: res.originAddresses[0],
        destination: res.destinationAddresses[0],
        duration: res.rows[0].elements[0].duration.text
      });
    } else {
      console.log(status);
    }
  }

  render() {
    return(
        <span>{this.state.duration}</span>
    );
  }
}

module.exports = RouteTime;