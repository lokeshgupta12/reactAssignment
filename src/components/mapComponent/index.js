import React from 'react';
import { GOOGLE_API_URL } from '../../constant'
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

export const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: GOOGLE_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%`, width: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (nextProps.path.length > 0) {
        const DirectionsService = new window.google.maps.DirectionsService()

        DirectionsService.route({
          origin: new window.google.maps.LatLng(nextProps.path[0][0], nextProps.path[0][1]),
          destination: new window.google.maps.LatLng(nextProps.path[2][0], nextProps.path[2][1]),
          travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            })
          } else {
            console.error(`error fetching directions ${result}`)
          }
        })
      }
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new window.google.maps.LatLng(41.8507300, -87.6512600)}
  >
  {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
)

export default MapWithADirectionsRenderer