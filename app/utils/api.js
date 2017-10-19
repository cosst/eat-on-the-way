var axios = require('axios');

module.exports = {
  getBusinesses: function (address) {
    return axios.get('/cafes', {params: {address: address}})
    // var address = this.address;
    // return axios.get('/cafes/?address=' + address)
    .then(function (response) {
      console.log(response.data.jsonBody.businesses);
      return response.data.jsonBody.businesses;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}