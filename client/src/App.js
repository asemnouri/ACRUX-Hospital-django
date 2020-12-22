import React from 'react'
import './App.css';
import Header from './Components/SharedComponents/Header/Header.jsx';
import DoctorPage from './Components/Pages/DoctorProfilePage/DoctorPage'
import { connect } from "react-redux"
import Departments from './Components/Pages/DepartmentPage/DepartmentPage'
import { setCurrentUser, setUserRole, setPatientId, setFetchId, setUserImage, setDoctorId } from './Redux/User/userActions'
import UsersProfile from "./Components/Pages/UserProfilePage/ProfilePage"
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage/HomePage'
import { viewDepartments } from './Redux/Department/departmentAction'
import DepartmentDoctor from './Components/Pages/DepartmentDoctorPage/DepartmentDoctor'
import AppointmentPage from './Components/Pages/AppointmentPage/AppointmentPage'
import ChatShell from "./Components/Pages/ChatPage/ChatShell"
import DiagnosePage from './Components/Pages/DiagnosePage/DiagnosePage'
import BloodBank from './Components/Pages/BloodBank/BloodBankMain'
import Footer from './Components/SharedComponents/Footer/Footer'
import CancerPage from './Components/Pages/DiagnosePage/CancerPage'
import AboutUs from './Components/Pages/AboutUsPage/AboutUs'


class App extends React.Component {
  constructor(props) {
    super(props)

  }


  componentDidMount = () => {
    this.loadUser()
    fetch('http://127.0.0.1:8000/department/')
      .then(response => response.json())
      .then(data => {
        //this.setState({departments : data})
        this.props.viewDepartments(data)
        console.log("dep", data)
      })


  }

  loadUser = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("Authorization")
      },
    };
    return fetch('http://localhost:8000/auth/users/me', requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log("ME", user)
        if (user.messages) {
          console.log('iff')
          throw Error
        }
        this.props.setCurrentUser(user)
        return user
      })
      .then((user) => this.userRole({ pk: user.id }))
      .catch(() => {
        this.props.setUserRole('user')
        this.props.setCurrentUser({
          currentUser: null,
          email: null,
          id: null
        })
        this.props.setFetchId(null)
        this.props.setDoctorId(null)
        localStorage.removeItem('Authorization')
        console.log('token expired')
      })

  }

  userRole = (user) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };


    fetch('http://localhost:8000/user/details', requestOptions)
      .then(response => response.json())
      .then(user => {
        // console.log(user.doctor.role)
        if (user.patient) {
          this.props.setUserRole(user.patient.role)
          this.props.setPatientId(user.patient.id)
          this.props.setFetchId(user.patient.userId)
          this.props.setUserImage(user.patient.image)
        } else if (user.doctor) {
          console.log('roole', user.doctor)
          this.props.setUserRole(user.doctor.role)
          this.props.setFetchId(user.doctor.doctor)
          this.props.setDoctorId(user.doctor.pk)
          this.props.setUserImage(user.doctor.image)
        }
      })
  }


  render() {

    const { departments, currentUser, role } = this.props

    return (
      <div className='App'>

        <Header />
        <Switch>
          <Route exact path='/' render={(props) => <HomePage departments={departments} {...props} />} />

          <Route exact path='/profile' render={(props) => currentUser ? <UsersProfile {...props} /> : <Redirect to='/' />} />
          <Route exact path='/bloodbank' render={(props) => currentUser ? <BloodBank {...props} /> : <Redirect to='/' />} />
          <Route exact path='/doctors' component={DoctorPage} />
          <Route exact path='/departments' render={(props) => <Departments departments={departments} {...props} />} />
          <Route exact path='/department/:id' render={(props) => <DepartmentDoctor {...props} />} />
          <Route exact path='/appointment/:id' render={(props) => (currentUser && role === 'patient') ? <AppointmentPage {...props} /> : <Redirect to='/' />} />
          {/* <Route exact path='/chat' render={(props) => currentUser ? <ChatShell {...props} /> : <Redirect to='/' />} /> */}
          <Route exact path='/chat/:id' render={(props) => currentUser ? <ChatShell {...props} /> : <Redirect to='/' />} />
          <Route exact path='/heart' render={(props) => currentUser ? <DiagnosePage {...props} /> : <Redirect to='/' />} />
          <Route exact path='/cancer' render={(props) => currentUser ? <CancerPage {...props} /> : <Redirect to='/' />} />
          <Route exact path='/about' component={AboutUs} />

        </Switch>
        <Footer />

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setUserRole: role => dispatch(setUserRole(role)),
    viewDepartments: department => dispatch(viewDepartments(department)),
    setFetchId: id => dispatch(setFetchId(id)),
    setPatientId: id => dispatch(setPatientId(id)),
    setUserImage: image => dispatch(setUserImage(image)),
    setDoctorId: id => dispatch(setDoctorId(id))


  }
}
const mapStateToProps = (state) => {
  // console.log('connect',state.user.currentUser)
  return {
    departments: state.department.Departments,
    currentUser: state.user.currentUser,
    role: state.user.role
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

