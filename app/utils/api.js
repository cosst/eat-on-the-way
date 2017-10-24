var axios = require('axios');

function callback(response, status) {
  // change name of this ^^ 
  var additionalTime = (response.rows[1].elements[1].duration.value + response.rows[0].elements[0].duration.value) - response.rows[0].elements[1].duration.value;
  console.log(additionalTime);
  // console.log(response);
  return additionalTime;
  if (status == 'OK') {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
      }
    }
  }
}
// change this so that it's just doing a single biz, then map through each of the biz with this function
function getAdditionalTime (businesses, originAddress, destinationAddress) {
  // console.log(businesses);
  var address1 = businesses[0].location.display_address[0];
  var address2 = businesses[0].location.display_address[1];
  var address3 = businesses[0].location.display_address[2];
  var eatAddress = [address1, address2, address3].filter(val => val).join(', ');
  var originAddress = originAddress;
  var destinationAddress = destinationAddress;
  console.log(originAddress);
  console.log(destinationAddress);
  console.log(eatAddress);

  const matrix = new google.maps.DistanceMatrixService();
  
  return matrix.getDistanceMatrix({
        origins: [originAddress, eatAddress],
        destinations: [eatAddress, destinationAddress],
        travelMode: google.maps.TravelMode.DRIVING,
    }, callback);
}
    // function callback(response, status) {
    //   // console.log(response);
    //   return response;
    //   if (status == 'OK') {
    //     var origins = response.originAddresses;
    //     var destinations = response.destinationAddresses;

    //     for (var i = 0; i < origins.length; i++) {
    //       var results = response.rows[i].elements;
    //       for (var j = 0; j < results.length; j++) {
    //         var element = results[j];
    //         var distance = element.distance.text;
    //         var duration = element.duration.text;
    //         var from = origins[i];
    //         var to = destinations[j];
    //       }
    //     }
    //   }
    //   // return results;
      // console.log(response);
    //   console.log(response.rows[0].elements[0].duration.value);
      // var additionalTime = (response.rows[1].elements[1].duration.value + response.rows[0].elements[0].duration.value) - response.rows[0].elements[1].duration.value;
    //   // console.log(results);
    //   return response;
    // }
      // console.log(response.originAddresses);
    // return additionalTime;
    // console.log(additionalTime);
    // console.log(results);
    // .then(function (response) {
      // var additionalTime = (res.rows[1].elements[1].duration.value + res.rows[0].elements[0].duration.value) - res.rows[0].elements[1].duration.value;
    //   console.log(additionalTime);
    //   return additionalTime;
    // });

  
  // renderDetails(res, status) {
  //   // if request was successful, pulling necessary duration data
  //   if (status == 'OK') {
  //     this.setState({
  //       originAddress: res.originAddresses[0],
  //       eatAddress: res.originAddresses[1],
  //       destinationAddress: res.destinationAddresses[1],
  //       routeDuration: res.rows[0].elements[1].duration.value,
  //       toEatDuration: res.rows[0].elements[0].duration.value,
  //       finalLegDuration: res.rows[1].elements[1].duration.value
  //     });
  //   } else {
  //     console.log(status);
  //   }
  // }

module.exports = {
  getDriveTime: function () {
    return axios.get('/drive-time')
    .then(function (response) {
      console.log(distances);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  getBusinesses: function (originAddress, destinationAddress) {
    return axios.get('/cafes', {params: {address: originAddress}})
    .then(function (response) {
      console.log(response.data.jsonBody.businesses);
      var businesses = response.data.jsonBody.businesses;
      // take business variable here and use it to make api calls for each business to determine arrival time and additional time
      // could create a whole new api endpoint
      var additionalTime = getAdditionalTime (businesses, originAddress, destinationAddress);
      console.log(additionalTime);
      // // var origins;
      // // console.log(origins);
      // console.log(response);
      return businesses;
      // .sort(function(a, b) {
      //   return .rating - a.rating;
      // })
      // var results = businesses.map(function(el) {
      // var o = Object.assign({}, el);
      // o.isActive = true;
      // return o;
      // })
      // console.log(results);
      // return businesses;
      // console.log(additionalTime);
    })
    .catch(function (error) {
      console.log(error);
    });
    // console.log(additionalTime);
  }
}

//   getBusinesses: function (originAddress, destinationAddress) {
//     return axios.get('/cafes', {params: {address: originAddress}})
//     .then(function (response) {
//       // console.log(response.data.jsonBody.businesses);
//       var businesses = response.data.jsonBody.businesses
//       .sort(function(a, b) {
//         return .rating - a.rating;
//       })
//       var results = businesses.map(function(el) {
//       var o = Object.assign({}, el);
//       o.isActive = true;
//       return o;
//       })
//       console.log(results);
//       return businesses;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }
// }