import React from "react";
import "components/DayListItem.scss"
import classnames from "classnames"

export default function DayListItem(props) {
  
  const dayClass = classnames("day-list__item", {
  "day-list__item--selected": props.selected,
  "day-list__item--full": (props.spots <= 0)
  });
  
  const formatSpots = function(spots) {
    if (spots === 0) {
      return "no spots remaining"
    } else if (spots === 1) {
      return "1 spot remaining"
    } else if (spots === 2) {
      return "2 spots remaining"
    } else if (spots === 3) {
      return "3 spots remaining"
    } else if (spots === 4) {
      return "4 spots remaining"
    } else if (spots === 5) {
      return "all spots available"
    }
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}