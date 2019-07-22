import React from 'react';
import GMAP_SETTINGS from '../../config/gmap.config'
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const { center, zoom, height, width, containerHeight } = GMAP_SETTINGS.MAP_SETTINGS

export const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: GMAP_SETTINGS.GOOGLE_API_URL,
    loadingElement: <div style={{ height: height }} />,
    containerElement: <div style={{ height: containerHeight }} />,
    mapElement: <div style={{ height: height, width: width }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      this.startingBox = new window.google.maps.places.Autocomplete(document.getElementById('from'), {})
      this.dropBox = new window.google.maps.places.Autocomplete(document.getElementById('to'), {})

      this.startingBox.addListener("place_changed", () => {
          this.props.handleSelectForStating(this.startingBox)
      })

      this.dropBox.addListener("place_changed", () => {
          this.props.handleSelectForDrop(this.dropBox)
      })
    },
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
    defaultZoom={zoom}
    defaultCenter={new window.google.maps.LatLng(center.lat, center.lng)}
  >
  {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
)

export default MapWithADirectionsRenderer