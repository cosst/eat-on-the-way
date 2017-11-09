var axios = require('axios');

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
  getBusinesses: function (latitude, longitude, radius) {
    return axios.get('/cafes', {params: {latitude: latitude, longitude: longitude, radius: radius}})
    .then(function (response) {
      return response.data.jsonBody.businesses;
      // // take business variable here and use it to make api calls for each business to determine arrival time and additional time
      // // could create a whole new api endpoint
      })
    .catch(function (error) {
      console.log(error);
    });
  }
}