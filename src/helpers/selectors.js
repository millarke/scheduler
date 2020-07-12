export function getAppointmentsForDay(state, day) {

  // const appointmentsForDay = [];
  // console.log("state:", state);

  // if (!state.days || !state.appointments || !day) {
  //   return [];
  // }

  // if (day === "") {
  //   return [];
  // }

  if (state.days.length > 0) {
    const dayObj = state.days.filter(element => element.name === day);
    if (dayObj.length > 0) {
      // const dayObjectApps = dayObject.appointments;
      const apmt = [];
      const apmtObj = dayObj[0].appointments
      // const apmtObj = state.appointments
      apmtObj.forEach(id => {
        apmt.push(state.appointments[id])
      })
      return apmt;
    }
    return [];
  }
  return [];
}