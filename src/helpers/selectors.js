export function getAppointmentsForDay(state, day) {

  if (state.days.length > 0) {
    const dayObj = state.days.filter(element => element.name === day);
    if (dayObj.length > 0) {
      const apmt = [];
      const apmtObj = dayObj[0].appointments

      apmtObj.forEach(id => {
        apmt.push(state.appointments[id])
      })
      return apmt;
    }
    return [];
  }
  return [];
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewObj = {};
    interviewObj.student = interview.student

    interviewObj.interviewer = {id: interview.interviewer, name: state.interviewers[interview.interviewer].name, avatar: state.interviewers[interview.interviewer].avatar }

    return interviewObj;

  } else {
    return null;
  }
}

export function getInterviewersForDay(state, day) {

  if (state.days.length > 0) {
    const dayObj = state.days.filter(element => element.name === day);
    if (dayObj.length > 0) {
      const intr = [];
      const intrObj = dayObj[0].interviewers
      intrObj.forEach(id => {
        intr.push(state.interviewers[id])
      })
      return intr;
    }
    return [];
  }
  return [];
}
