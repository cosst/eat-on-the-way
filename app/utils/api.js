var axios = require('axios');

function sortBusinesses (players) {
  return players.sort(function (a,b) {
    return b.score - a.score;
  });
}

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
  getBusinesses: function (address) {
    return axios.get('/cafes', {params: {address: address}})
    .then(function (response) {
      console.log(response.data.jsonBody.businesses);
      var businesses = response.data.jsonBody.businesses
      .sort(function(a, b) {
        return a.distance - b.distance;
      })
      return businesses;
      console.log(businesses);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}