import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";



export default function Appointment(props) {
  // return (
  //   <article className="appointment"></article>
  // )

  // console.log("111111: ", props);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  ///
  
    // console.log("!!!!!!!!!!!!!!")
    // console.log("props.bookInterview(props.id, interview): ", props.bookInterview(props.id, interview))
    // console.log("interview: ", interview)
    // console.log("props.id: ", props.id)
    // transition(SHOW)
    // .catch(() => transition(ERROR_SAVE, true))
    ///
  transition(SAVING);

  props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
    
}

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
            interviewers={props.interviewers}
            onSave={ save }
            onCancel={() => back()}
          />}
        {mode === SAVING && (<Status
            message="Saving" 
          />)}
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
