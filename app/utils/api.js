var axios = require('axios');

module.exports = {
  getBusinesses: function () {
    return axios.get('/cafes/')
    .then(function (response) {
      console.log(response.data.jsonBody.businesses);
      return response.data.jsonBody.businesses;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}