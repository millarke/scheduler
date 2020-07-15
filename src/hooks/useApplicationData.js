import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // const appointments = getAppointmentsForDay(state, state.day);
  // // console.log("appointments ln.22", appointments);
  // const interviewers = getInterviewersForDay(state, state.day);
  // // console.log("appointments ln.23", appointments);

  // const schedule = appointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);

  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //       interviewers={interviewers}
  //       bookInterview={bookInterview}
  //       cancelInterview={cancelInterview}
  //     />
  //   );
  // });

  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({...prev, days}));
  const setAppointments = appointments => setState(prev => ({...prev, appointments}));

  /////////
  function bookInterview(id, interview) {
    // console.log("id, interview: ", id, interview);
    
    const newAptObj = { ...state.appointments[id], interview };
    const newAppointments = { ...state.appointments, [id]: newAptObj}
    const newDays = state.days.map(day => {
      if (state.day === day.name) {
        return { ...day, spots: day.spots - 1}
      } else {
        return day
      }
    })

    // console.log("state: ", state)
    // console.log("newAppointments: ", newAppointments)
    return (
      axios.put(`/api/appointments/${id}`, newAptObj)
        .then(function (response) {
          console.log(response);
            setState({
              ...state,
              appointments: newAppointments,
              days: newDays
            });
        })
    )
  }
  /////////

  function cancelInterview(id) {
    // console.log("testing if hit!", id)
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const newDays = state.days.map(day => {
      if (state.day === day.name) {
        return { ...day, spots: day.spots + 1}
      } else {
        return day
      }
    })


    return (
      axios.delete(`/api/appointments/${id}`)
        .then((response) => {
          console.log("response: ", response);
          setState({
            ...state,
            appointments,
            days: newDays

          })
        })
        // )
    )
  }


  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      console.log("useEffect")
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));
    });
    }, []
  )

return { state: state, setDay, bookInterview, cancelInterview }
}