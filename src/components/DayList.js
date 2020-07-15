import React from "react";
import classnames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {
// console.log("props: ",props);
// console.log("props.days: ",props.days);
  const days = props.days.map(
    day => {
      // console.log("!!!!!!!! ", day.id)
      return (
        //TODO: Added in the day.id key in the ul to get rid  of an error, find out why later
        <ul  key={day.id}>
          <DayListItem 
          key={day.id}
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