import React from 'react';
import MapWithADirectionsRenderer from '../mapComponent'
import LoadingSpinner from '../loadingSpineer'
import   './formComponent.css'
import { fetchPostApi, fetchGetApi} from '../../services'

export default class Forms extends React.Component {
   
    state = {
        from: "",
        to: "",
        path: [],
        statusFlag: false,
        errorMessage: ''
     }

    handleResetButton() {
        this.setState({
            from:'',
            to: '',
            path: [],
            statusFlag: false,
            errorMessage: '',
            totalDistance: '',
            totalTime: ''
        })
    }

    handleChange({ target: {name, value} }) {
        this.setState({[name]:value})
    }

    callGetApiWithToken(response) {
        fetchGetApi(response.data.token)
        .then(response => {
            if (response.data.status === "in progress") {
                // Call callGetApiWithToken method, When status of get API is in progress
                this.setState({
                    statusFlag: true
                }) 
                this.callGetApiWithToken(response)
            }

            else if (response.data.status === "failure") {
                this.setState({ 
                    errorMessage: response.data.error,
                    path: [],
                    statusFlag: false,
                    totalDistance: '',
                    totalTime: ''
                })
            }

            else if (response.data.status === 'success') {
                this.setState({
                    path: response.data.path,
                    errorMessage: '',
                    statusFlag: false,
                    totalDistance: response.data.total_distance,
                    totalTime: response.data.total_time
                })
            }
            
        })
        .catch(error => {
          this.setState({
            errorMessage: 'Location not accessible by car',
            statusFlag: false
          })
        })
    }
    
    handleSelectForStartingLocation() {
        const { value } = this.refs.fromInput
        this.setState({from :value})
    }

    handleSubmitButton() {
        const { from, to } = this.state
        const input = {
          from: from,
          to: to
        }

        this.setState({
            statusFlag: true,
            errorMessage: ''
        })

        fetchPostApi(input)
        .then(data => {
            this.callGetApiWithToken(data)
        })
        .catch(error => {
            this.setState({
                errorMessage: 'Location not accessible by car',
                statusFlag: false
            })
        })
    }

    handleSelectForDropLocation() {
        const { value } = this.refs.toInput
        this.setState({to :value})
    }

    render() {
        const { errorMessage, from, statusFlag, to, totalDistance, totalTime, path } = this.state

        return (
            <React.Fragment>
                <div className="col-md-3">
                    <div className="form-group rowMargin">
                        <label htmlFor="from">Starting location</label>
                        <input ref = "fromInput" className="form-control" id="from" type="text" name="from" value={from} onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="to">Drop-off point</label>
                        <input ref = "toInput" className="form-control" id="to" name="to" type="text" value={to} onChange={(e) => this.handleChange(e)} />
                    </div>
                    {errorMessage &&
                        <label className="redLabel">{errorMessage}</label>}
                    {totalDistance &&
                            <label>Total Distance: {totalDistance}</label>}<br/>
                    {totalTime &&
                            <label>Total Time: {totalTime}</label>}<br/>
                    <button className="btn btn-primary submitBtn" onClick={() => this.handleSubmitButton()} >Submit</button>
                    <button className="btn btn-secondary resetBtn" onClick={() => this.handleResetButton()}>Reset</button>
                </div>
                <div className="col-md-9 secondRowMargin">
                    <MapWithADirectionsRenderer path={path}
                        handleSelectForStating={this.handleSelectForStartingLocation.bind(this)}
                        handleSelectForDrop={this.handleSelectForDropLocation.bind(this)}
                    ></MapWithADirectionsRenderer>
                </div>
                { statusFlag && <LoadingSpinner />}
            </React.Fragment>
            
        )
    }
  } 