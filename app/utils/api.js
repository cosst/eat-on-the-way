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
  getBusinesses: function (address) {
    return axios.get('/cafes', {params: {address: address}})
    .then(function (response) {
      console.log(response.data.jsonBody.businesses);
      return response.data.jsonBody.businesses;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}