import React, { useEffect } from "react"
import "./UserProfile.css"
import { connect } from "react-redux"
import { setMessageContacts,setContactTitle } from "./../../../Redux/User/userActions"
import { Link } from "react-router-dom"
const DoctorProfile = ({ setMessageContacts, role, fetchId, contactArray,setContactTitle }) => {

    useEffect(() => {
        const pk = fetchId
        getDoctors({ pk })
    }, []);
    const getDoctors = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        if (role === "patient") {
            fetch('http://localhost:8000/patient/details', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setMessageContacts(data.doctors)
                    // this.setState({ results: data.doctors })
                })
        }
        if (role === "doctor") {
            fetch('http://localhost:8000/doctor/details', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setMessageContacts(data.patients)
                    // this.setState({ results: data.patients })
                })
        }
    }
    // console.log("contactArray", contactArray)
    const handleSetName=(contact)=>{
        console.log("fffffffffffffffff00" ,contact)
        setContactTitle(contact)
    }
    return (
        <div className="content__left">
            <div className="content__left__collection">
                {contactArray?
                    contactArray.map((oneContact, id) => {
                        return (
                            <Link to={`/chat/${oneContact.doctorId || oneContact.patientId}`} key={id} onClick={(e)=>handleSetName(oneContact.doctorName||oneContact.patientName)} >
                                <div className="image-div">
                                    <img className="chat-image" src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg" alt="" />
                                    <p>{oneContact.doctorName || oneContact.patientName}</p>
                                </div>
                            </Link>
                        )
                    })
                    :<div></div>
                }
            </div>
            <div className="content__left__royal">
                royal ui force
        </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMessageContacts: array => dispatch(setMessageContacts(array)),
        setContactTitle: contact => dispatch(setContactTitle(contact)),

    }
}

const mapStateToProps = ({ user: { role, fetchId, contactArray } }) => {
    return {
        role,
        fetchId,
        contactArray

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile)