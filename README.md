# Eat on the Way

A tool to see what's good to eat along your route and how much time it will add to your trip. Makes use of the Yelp Fusion & Google Maps Distance Matrix APIs.

## Getting Started

1. Install [Node](https://nodejs.org/en/) if you don't already have it installed. Version 6+ required to run the app.
2. Install [yarn](https://yarnpkg.com/en/).
3. Install yarn dependencies with `yarn install`
4. Create an app with [Yelp](https://www.yelp.com/developers/documentation/v3/authentication) and then get an access token. [This](http://jacklyons.me/yelp-fusion-api-access-token/) is a great visual guide on how to get your token using [Postman](https://www.getpostman.com/).
5. Create a .env file in the root of your project where you set your Yelp access token.
```
YELP_TOKEN=123456EXAMPLE
```
6. Create a .env.default file in the root of your project. This can be blank but is necessary for the webpack-dotenv-plugin dev dependency to work properly.

## Running The Development Server

```
yarn start
```
