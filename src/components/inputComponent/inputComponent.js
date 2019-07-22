import React from 'react';
import PropTypes from 'prop-types'


export default class InputControl extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        lableShow: PropTypes.bool,
        labelValue: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    }

    static defaultProps = {
        value: '',
        lableShow: true
    }

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onChange(e)
    }

    render() {
        const { id, lableShow, labelValue, name, placeholder, type, value } = this.props

        return (
            <React.Fragment>
                { lableShow &&
                 <label htmlFor={name}> { labelValue } </label> }
                 <input className="form-control" id={id} type={type} name={name} value={value} placeholder={placeholder} onChange={(e) => this.handleChange(e)} />  
            </React.Fragment>
            
        )
    }
}