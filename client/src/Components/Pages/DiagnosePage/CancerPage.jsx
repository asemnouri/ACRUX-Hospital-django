import React from 'react'
import { TextField } from '@material-ui/core';
import './CancerPage.css'
import CustomizedDialogs from './DjagnoseResult'

class CancerPage extends React.Component {
    constructor() {
        super()
        this.state = {
            Clump_Thickness: null,
            Cell_Size_Uniformity: null,
            Cell_Shape_Uniformity: null,
            Marginal_Adhesion: null,
            Single_Epi_Cell_Size: null,
            Bare_Nuclei: null,
            Bland_Chromatin: null,
            Normal_Nucleoli: null,
            Mitoses: null,
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
        const { Clump_Thickness, Cell_Size_Uniformity, Cell_Shape_Uniformity, Marginal_Adhesion, Single_Epi_Cell_Size, Bare_Nuclei, Bland_Chromatin, Normal_Nucleoli, Mitoses } = this.state
        const obj = { Clump_Thickness, Cell_Size_Uniformity, Cell_Shape_Uniformity, Marginal_Adhesion, Single_Epi_Cell_Size, Bare_Nuclei, Bland_Chromatin, Normal_Nucleoli, Mitoses }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };

        fetch('http://localhost:8000/doctor/cancer', requestOptions)
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
        const { Clump_Thickness, Cell_Size_Uniformity, Cell_Shape_Uniformity, Marginal_Adhesion, Single_Epi_Cell_Size, Bare_Nuclei, Bland_Chromatin, Normal_Nucleoli, Mitoses, probability, label } = this.state
        return (
            <div className='cancer_page'>
                <div className='cancer_picture'></div>
                <div className='cancer_text'>
                    <h1 >Diagnose Cancer</h1>
                </div>
                {/* <h3 id="cancer_title">Cancer Form</h3> */}

                <div className='cancer_form'>
                    <form onSubmit={this.onSubmit} className='form_textfield_heart'>
                        <div className='cancer_form1'>
                            <br/>
                            <br/>
                            <TextField id="standard"  label="Clump_Thickness(1 - 10)" onChange={this.handleChange} name='Clump_Thickness' type='text' value={Clump_Thickness} required />
                            <br />
                            <TextField id="standard" label="Cell_Size_Uniformity(1 - 10)" onChange={this.handleChange} name='Cell_Size_Uniformity' type='text' value={Cell_Size_Uniformity} required />
                            <br />
                            <TextField id="standard" label="Cell_Shape_Uniformi(1 - 10)" onChange={this.handleChange} name='Cell_Shape_Uniformity' type='text' value={Cell_Shape_Uniformity} required />
                            <br />
                            <TextField id="standard" label="Marginal_Adhesion(1 - 10)" onChange={this.handleChange} name='Marginal_Adhesion' type='text' value={Marginal_Adhesion} required />
                            <br />
                            <TextField id="standard" label="Single_Epi_Cell_Size(1 - 10)" onChange={this.handleChange} name='Single_Epi_Cell_Size' type='text' value={Single_Epi_Cell_Size} required />
                            <br />
                            <TextField id="standard" label="Bare_Nuclei(1 - 10)" onChange={this.handleChange} name='Bare_Nuclei' type='text' value={Bare_Nuclei} required />
                            <br />
                            <TextField id="standard" label="Bland_Chromatin(1 - 10)" onChange={this.handleChange} name='Bland_Chromatin' type='text' value={Bland_Chromatin} required />
                            <br />
                            <TextField id="standard" label="Normal_Nucleoli(1 - 10)" onChange={this.handleChange} name='Normal_Nucleoli' type='text' value={Normal_Nucleoli} required />
                            <br />
                            <TextField id="standard" label="Mitoses(1 - 10)" onChange={this.handleChange} name='Mitoses' type='text' value={Mitoses} required />
                        </div>
                        <br />
                        <div className='cancer_result'>
                            <CustomizedDialogs result={this.postRequest} label={label} probability={probability} />
                        </div>
                    </form>
                </div>
            </div>

        )
    }

}


export default CancerPage