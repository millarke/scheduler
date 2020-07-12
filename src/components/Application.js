// import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import DayListItem from "components/DayListItem";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js"

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Keith Millar",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Corey Hennessy",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    // console.log("ababababddbadababdaa")
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({...prev, days}));
  const setAppointments = appointments => setState(prev => ({...prev, appointments}));



  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      // console.log("111111111111: ", all[0]); // first
      // console.log("222222222222: ", all[1]); // second
    
      const [days, appointments, interviewers] = all;
    
      console.log("333333: ", days.data, appointments.data, interviewers.data);

      // setState({ ...state, days: all[0].data, appointments: all[1].data});
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));
    
    
    
    
    
    });

      // axios.get(`/api/days`)
      //   .then(response => setDays(response.data))
      //   // .then(response => console.log(response.data.results))
      //   .catch(function (error) {
      //     console.log(error);
      //   })


    }, []
  )
  
  console.log("2555552525552: ", state.appointments)

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

// {(appointments).map(appointment => 
//   <Appointment
//     key={appointment.id}   {...appointment} 
//   />)}