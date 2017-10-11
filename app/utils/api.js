var axios = require('axios');

// Need to obfuscate id & secret
// var config = {
//   headers: {'Authorization': 'Bearer 6DZUS2oCV38kFoiBfBMvtvgkqW593BWe1cZN1Qt92dlvu-FQUzSd3f8EyLoaHCD_QtFYSlnMAB37EgNyN3CV2Za01p6xMDEd_b4jZpI-QJAOS_k1vmRlGeTF34bUWXYx'}
// };

// function getRestaurants () {
//   return axios.get('https://api.yelp.com/v3/businesses/search/?categories=restaurants, All&location=601 E 2nd St, Los Angeles, CA 90012&radius=1610&limit=5&sort_by=rating&open_now=true', config)
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

module.exports = {
  getRestaurants: function () {
    //var encodedURI = window.encodeURI('https://api.yelp.com/v3/businesses/search/?categories=restaurants, All&location=601 E 2nd St, Los Angeles, CA 90012&radius=1610&limit=5&sort_by=rating&open_now=true', config);

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