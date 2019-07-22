# Route Locator App

Application displaying driver route on Google Map

## Pre-Requisties

Backend [mockApi](https://github.com/lalamove/challenge/tree/master/mockApi) should be running on the system

## Google Maps Api configuration

Update the `Google` Api key on .env file.

```
REACT_APP_GOOGLE_API_KEY = <Google Api key>
```

Google map configurations are stored in `/src/config/gmap.config.js` with the default configuration as:

```
{
    "MAP_SETTINGS" : {
      "center": {
        "lat": 41.8507300, 
        "lng": -87.6512600
      },
      "zoom": 8,
      'width': '100%',
      'containerHeight': '720px',
      'height': `100%`
    },
    'GOOGLE_API_URL': `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`
  }
```

## Steps to run app

```
npm install
npm start
```

## Tests

Run `npm test` to run the tests
