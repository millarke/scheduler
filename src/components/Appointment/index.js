import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  // return (
  //   <article className="appointment"></article>
  // )

  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    
    <>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && <Form
            interviewers={[]}
            onSave={() => console.log("onSave")}
            onCancel={() => back()}
          />}
      </article>
    </>

  )};

// return (
//   <>
//   {props.interview ? 
//   <>
//      <Header time={props.time} />
//      <article className="appointment">
//        <Show 
//         student={props.interview.student}
//         interviewer={props.interview.interviewer}
//       />
//     </article>
//     </>
//     :
//     <>
//      <Header time={props.time} />
//      <article className="appointment">
//        <Empty />
//      </article>
//      </>
// }
//   </>
// ) 
