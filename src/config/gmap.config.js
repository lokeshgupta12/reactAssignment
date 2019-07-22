const GMAP_SETTINGS = {
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
  
  export default GMAP_SETTINGS;