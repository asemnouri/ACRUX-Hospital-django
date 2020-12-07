import React from 'react';
import './doctor.css'
import DoctorCard from "./DoctorCard";
// import setCurrentDoctor from '../Redux/Doctor/doctorActions';

class DoctorPage extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     doctors: []
        // }
    }
    componentDidMount() {
        this.getDoctors()
    }
    getDoctors = () => {
        fetch('http://localhost:8000/doctor/')
            .then(response => response.json())
            .then(doctor => {
                console.log("result", doctor)
                // this.setState({ doctors: data })
                this.props.setCurrentDoctor(doctor)
                return doctor
                // console.log(this.props.setCurrentDoctor(doctor))
            })
        }

    render() {
        const { doctors } =  this.props.setCurrentDoctor(doctor)
        return ( 
            <div className='home'>
                <div className='doctors'>
                    {
                        doctors? doctors.map((doc, i) => <DoctorCard doctor={doc} key={i} />
                        ) : <div></div>
                    }
                </div>
            </div>
        );
    }
}

export default DoctorPage