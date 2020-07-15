import "components/Application.scss";
import DayList from "components/DayList";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import DayListItem from "components/DayListItem";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js"
import useApplicationData from "../hooks/useApplicationData.js"


export default function Application(props) {

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  // console.log("appointments ln.22", appointments);
  const interviewers = getInterviewersForDay(state, state.day);
  // console.log("appointments ln.23", appointments);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // const setDay = day => setState({...state, day});
  // // const setDays = days => setState(prev => ({...prev, days}));
  // const setAppointments = appointments => setState(prev => ({...prev, appointments}));

  // /////////
  // function bookInterview(id, interview) {
  //   console.log("id, interview: ", id, interview);
    
  //   const newAptObj = { ...state.appointments[id], interview };
  //   const newAppointments = { ...state.appointments, [id]: newAptObj}

  //   // console.log("state: ", state)
  //   // console.log("newAppointments: ", newAppointments)
  //   return (
  //     axios.put(`/api/appointments/${id}`, newAptObj)
  //       .then(function (response) {
  //         console.log(response);
  //           setState({
  //             ...state,
  //             appointments: newAppointments
  //           });
  //       })
  //   )
  // }
  // /////////

  // function cancelInterview(id) {
  //   console.log("testing if hit!", id)
  //   const appointment = { ...state.appointments[id], interview: null };
  //   const appointments = { ...state.appointments, [id]: appointment };

  //   return (
  //     axios.delete(`/api/appointments/${id}`)
  //       .then((response) => {
  //         console.log("response: ", response);
  //         setState({
  //           ...state,
  //           appointments
  //         })
  //       })
  //       // )
  //   )
  // }

  // useEffect(() => {
  //   Promise.all([
  //     axios.get(`/api/days`),
  //     axios.get(`/api/appointments`),
  //     axios.get(`/api/interviewers`)
  //   ]).then((all) => {
  //     const [days, appointments, interviewers] = all;
  //     console.log("useEffect")
  //     setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));
  //   });
  //   }, []
  // )
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {/* <Appointment key={appointment.id} {...appointment} /> */}
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}