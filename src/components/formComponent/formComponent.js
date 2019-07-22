import React from 'react';
import MapWithADirectionsRenderer from '../mapComponent'
import ERROR_MSG from '../../constant/error'
import InputControl from '../inputComponent'
import API_CONSTANT from '../../constant/api'
import LoadingSpinner from '../loadingSpineer'
import   './formComponent.css'
import { postRoutes, getRoutes } from '../../services/locator-api'

export default class FormComponent extends React.Component {
   
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

    callGetApiWithToken = async (response) => {
        let state = {}
        const resultData = await getRoutes(response.data.token)
        if(resultData) {
            switch(resultData.data.status) {
                case(API_CONSTANT.MSG_SUCCESS): {
                    state = {
                        path: resultData.data.path,
                        statusFlag: false,
                        errorMessage: '',
                        totalDistance: resultData.data.total_distance,
                        totalTime: resultData.data.total_time
                    }
                    break;
                }
                default: {
                    state = {
                        errorMessage: ERROR_MSG.API_SERVER_ERROR,
                        statusFlag: false
                    }
                    break;
                  }
            }
        }
        this.setState(state)
    }
    
    handleSelectForStartingLocation(event) {
        const value = event.getPlace().formatted_address
        this.setState({from :value})
    }

    handleSubmitButton = async () => {
        const { from, to } = this.state
        const input = {
          from: from,
          to: to
        }

        this.setState({
            errorMessage: '',
            statusFlag: true
        })

        const resulObject = await postRoutes(input)

        if (resulObject.status=== 200 && resulObject.data.token) {
            this.callGetApiWithToken(resulObject)
        } else {
            this.setState({
                errorMessage: ERROR_MSG.API_SERVER_ERROR,
                statusFlag: false
            })
        }
    }

    handleSelectForDropLocation(event) {
        const value = event.getPlace().formatted_address
        this.setState({to :value})
    }

    render() {
        const { errorMessage, from, statusFlag, to, totalDistance, totalTime, path } = this.state

        return (
            <React.Fragment>
                <div className="col-md-3">
                    <div className="form-group rowMargin">
                        <InputControl
                            ref = "fromInput"
                            labelShow
                            labelValue ="Starting Location"
                            value={from}
                            name="from"
                            id="from"
                            type="text"
                            onChange={this.handleChange.bind(this)}
                            />
                    </div>
                    <div className="form-group">
                    <InputControl
                            ref = "toInput"
                            labelShow
                            labelValue ="Drop-off point"
                            value={to}
                            name="to"
                            id="to"
                            type="text"
                            onChange={this.handleChange.bind(this)}
                    />
                    </div>
                    {errorMessage &&
                        <label className="redLabel">{errorMessage}</label>}
                    {totalDistance &&
                            <label>Total Distance: {totalDistance}</label>}<br/>
                    {totalTime &&
                            <label>Total Time: {totalTime}</label>}<br/>
                    <button disabled = { !(from && to) }className="btn btn-primary submitBtn" onClick={this.handleSubmitButton.bind(this)} >Submit</button>
                    <button className="btn btn-secondary resetBtn" onClick={() => this.handleResetButton()}>Reset</button>
                </div>
                <div className="col-md-9 secondRowMargin">
                    <MapWithADirectionsRenderer path={path}
                        handleSelectForStating={this.handleSelectForStartingLocation.bind(this)}
                        handleSelectForDrop={this.handleSelectForDropLocation.bind(this)}
                    ></MapWithADirectionsRenderer>
                </div>
                <LoadingSpinner  enableLoading = {statusFlag}/>}
            </React.Fragment>
            
        )
    }
  } 