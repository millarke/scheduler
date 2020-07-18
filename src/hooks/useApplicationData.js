import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors"

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});
  
  const setAppointments = appointments => setState(prev => ({...prev, appointments}));

  /////////
  function bookInterview(id, interview) {
    
    
    const newAptObj = { ...state.appointments[id], interview };
    const newAppointments = { ...state.appointments, [id]: newAptObj}
    const newDays = state.days.map(day => {
      if (state.day === day.name) {
        
        return { ...day, spots: getAppointmentsForDay({ ...state, appointments: newAppointments }, day.name).filter(apt => !apt.interview).length}
      } else {
        return day
      }
    })


    return (
      axios.put(`/api/appointments/${id}`, newAptObj)
        .then(function (response) {
        
            setState(state => ({
              ...state,
              appointments: newAppointments,
              days: newDays
            }));
        })
    )
  }
  /////////

  function cancelInterview(id) {
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
          setState(state => ({
            ...state,
            appointments,
            days: newDays

          }))
        })
    )
  }


  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));
    });
    }, []
  )

return { state: state, setDay, bookInterview, cancelInterview }
}