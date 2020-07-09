import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  // return (
  //   <article className="appointment"></article>
  // )

  
  return (
    <>
    {props.interview ? 
    <>
       <Header time={props.time} />
       <article className="appointment">
         <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      </article>
      </>
      :
      <>
       <Header time={props.time} />
       <article className="appointment">
         <Empty />
       </article>
       </>
}
    </>
  ) 

};