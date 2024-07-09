import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

// const initialList = [
//   {
//     id: v4(),
//     title: 'Dentist',
//     date: new Date(),
//     isFavorite: false,
//   },
// ]

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(each => each.isFavorite === true)
    }
    return appointmentsList
  }

  renderAppointmentItems = () => {
    // const {appointmentsList} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    const listItems = filteredAppointmentsList.map(eachItem => (
      <AppointmentItem
        appointmentDetails={eachItem}
        key={eachItem.id}
        toggleIsFavorite={this.toggleIsFavorite}
      />
    ))
    return listItems
  }

  onChangeTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label htmlFor="title-input" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title-input"
                  placeholder="Title"
                  className="input-style"
                  value={titleInput}
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="date-input" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date-input"
                  className="input-style"
                  value={dateInput}
                  onChange={this.onChangeDate}
                />
                {/* <br /> */}
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="line" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {this.renderAppointmentItems()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
