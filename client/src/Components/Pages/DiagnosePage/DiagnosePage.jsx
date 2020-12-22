import React from 'react'
import { TextField, Button } from '@material-ui/core';
import './Diagnose.css'
import CustomizedDialogs from './DjagnoseResult'

class DiagnosePage extends React.Component {
    constructor() {
        super()
        this.state = {
            age: null,
            sex: null,
            cp: null,
            trestbps: null,
            chol: null,
            fbs: null,
            restecg: null,
            thalach: null,
            exang: null,
            oldpeak: null,
            slope: null,
            ca: null,
            thal: null,
            probability: null,
            label: null
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
        console.log(value)
    }

    postRequest = () => {
        const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = this.state
        const obj = { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };

        fetch('http://localhost:8000/doctor/heart', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === 'OK') {
                    this.setState({
                        probability: result.probability,
                        label: result.label
                    })
                } else {
                    console.log(result)
                }
            })
    }


    render() {
        const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, probability, label } = this.state
        return (
            <div className='form_page'>
                <div className='form_picture'></div>
                <div className='form_text'>
                    <h1 >Diagnose Heart  Attack</h1>
                </div>
                <div className='form'>
                    <form onSubmit={this.onSubmit} className='form_textfield'>
                        <div className='form1'>
                        <br/>
                        <br/>
                            <TextField id="standard-basic" label="Your age in years" onChange={this.handleChange} name='age' type='text' value={age} required />
                            <br />
                            <TextField id="standard-basic" label="1 = male; 0 = female" onChange={this.handleChange} name='sex' type='text' value={sex} required />
                            <br />
                            <TextField id="standard-basic" label="Chest pain type" onChange={this.handleChange} name='cp' type='text' value={cp} required />
                            <br />
                            <TextField id="standard-basic" label="Resting blood pressure" onChange={this.handleChange} name='trestbps' type='text' value={trestbps} required />
                            <br />
                            <TextField id="standard-basic" label="Serum cholestoral in mg/dl" onChange={this.handleChange} name='chol' type='text' value={chol} required />
                            <br />
                            <TextField id="standard-basic" label="(fasting blood sugar > 120 mg/dl)" onChange={this.handleChange} name='fbs' type='text' value={fbs} required />
                            <br />
                            <TextField id="standard-basic" label="Electrocardiographic results" onChange={this.handleChange} name='restecg' type='text' value={restecg} required />
                        </div>
                        <div className='form2'>
                            <TextField id="standard-basic" label="Maximum heart rate achieved" onChange={this.handleChange} name='thalach' type='text' value={thalach} required />
                            <br />
                            <TextField id="standard-basic" label="Exercise induced angina (1 = yes; 0 = no)" onChange={this.handleChange} name='exang' type='text' value={exang} required />
                            <br />
                            <TextField id="standard-basic" label="ST depression induced by exercise" onChange={this.handleChange} name='oldpeak' type='text' value={oldpeak} required />
                            <br />
                            <TextField id="standard-basic" label="The slope of the peak exercise ST segment" onChange={this.handleChange} name='slope' type='text' value={slope} required />
                            <br />
                            <TextField id="standard-basic" label="number of major vessels (0-3)" onChange={this.handleChange} name='ca' type='text' value={ca} required />
                            <br />
                            <TextField id="standard-basic" label="3 = normal; 6 = fixed defect; 7 = reversable defect" onChange={this.handleChange} name='thal' type='text' value={thal} required />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <div className='result'>
                                <CustomizedDialogs result={this.postRequest} label={label} probability={probability} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }

}


export default DiagnosePage