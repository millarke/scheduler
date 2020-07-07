import React from "react";

import "components/Button.scss";
import classnames from "classnames"

export default function Button(props) {
  
  // const buttonClass = classnames("button", {
  //   "button--confirm": props.confirm,
  //   "button--danger": props.danger
  // });

  const buttonClass = classnames(
    {button: true, 
    "button--confirm": props.confirm,
    "button--danger": props.danger
    });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
    {props.children}
    </button>
  );
 }



// import React from "react";

// import "components/Button.scss";

// export default function Button(props) {
//    let buttonClass = "button";

//    if (props.confirm) {
//       buttonClass += " button--confirm";
//    }

//    if (props.danger) {
//       buttonClass += " button--danger"
//    }

//    return (
//       <button 
//          className={buttonClass}
//          disabled={props.onClick}
//          onClick={props.disabled}
//    >
//       {props.children}
//    </button>
//    );
// }
