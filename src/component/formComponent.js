import React from 'react';
import MapWithADirectionsRenderer from './mapComponent'
import axios from 'axios';
import   './common.css'
import { MOCK_API_URL } from '../App_Constant'

const HEADER = {
    'Content-Type': "application/json"
}

export default class Forms extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           from: "",
           to: "",
           path: [],
           statusFlag: false,
           errorMessage: ''
        }
        this.handleSubmitButton = this.handleSubmitButton.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleResetButton = this.handleResetButton.bind(this)
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

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    callGetApiWithToken(response) {
        axios.get(MOCK_API_URL + '/' + response.data.token)
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
    
    handleSubmitButton() {
        const { from, to } = this.state
        const input = {
          from: from,
          to: to
        }

        this.setState({
            statusFlag: true
        })

        axios.post(MOCK_API_URL, { headers: HEADER }, { input })
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

    render() {
        const {errorMessage, from, statusFlag, to, totalDistance, totalTime, path} = this.state

        return (
            <div>
                <div className="leftDiv">
                    <label className="leftlabel">Starting location</label><br/><br/>
                    <input className="leftlabel" type="text" name="from" value={from} onChange={this.handleChange}/><br/><br/>
                    <label className="leftlabel">Drop-off point</label><br/><br/>
                    <input className="leftlabel" name="to" type="text" value={to} onChange={this.handleChange} /><br/>
                    { statusFlag && <span>In Progress...</span> }
                    {totalDistance &&
                    <span>Total Distance: {totalDistance}</span>}<br/>
                    {totalTime &&
                    <span>Total Time: {totalTime}</span>}<br/>
                    {errorMessage &&
                    <label className="redLabel">{errorMessage}</label>}<br/>
                    <button className="leftlabel" onClick={this.handleSubmitButton} >Submit</button>
                    <button onClick={this.handleResetButton}>Reset</button>
                    
                </div>
                <div className="rightDiv">
                    <MapWithADirectionsRenderer path={path}></MapWithADirectionsRenderer>
                </div>
                
            </div>
        )
    }
  } 