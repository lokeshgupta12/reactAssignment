import React from 'react';
import './loading.css'
import PropTypes from 'prop-types'

export default class LoadingSpinner extends React.Component {
  static propTypes = {
    enableLoading: PropTypes.bool.isRequired
}

static defaultProps = {
    enableLoading: false
}
  
render() {
  const { enableLoading } = this.props
  return (
    enableLoading && 
      <div className="overlay">
      <div className="overlay__inner">
        <div className="overlay__content"><span className="spinner"></span></div>
      </div>
      </div> 
  )
}
}
