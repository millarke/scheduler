import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
      // console.log("!!!!!!!!!!!!!!")
      // console.log("props.bookInterview(props.id, interview): ", props.bookInterview(props.id, interview))
      // console.log("interview: ", interview)
      // console.log("props.id: ", props.id)
      // transition(SHOW)
      // .catch(() => transition(ERROR_SAVE, true))
    transition(SAVING);

    props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
  }

  function destroy(event) {
    console.log("event: ", event)
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    // .catch(() => transition(ERROR_DELETE, true))
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
            onDelete={ destroy }
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
        {mode === DELETING && (<Status
            message="Deleting"
          />)}
        {mode === CONFIRM && (<Confirm 
            message="Are you sure you would like to delete?"
            id = {props.id}
            onDeleteConfirm={ destroy }
            onDeleteCancel={() => back()}
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
