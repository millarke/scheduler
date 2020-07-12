import React from "react";
import classnames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {
console.log("props: ",props);
console.log("props.days: ",props.days);
  const days = props.days.map(
    day => {
      return (

        <ul>
          <DayListItem 
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={props.setDay} />
        </ul>

      )}
  )

  return days

  // return null
};