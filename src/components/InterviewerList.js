import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"
import classnames from "classnames"

/////
// TODO - this might have cause everything to crash earlier, unknown at this point
import PropTypes from 'prop-types';
InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

/////

export default function InterviewerList(props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">

        {props.interviewers.map(interviewer => {

          // <InterviewerListItem
          //   // key={interviewer.id}
          //   name={interviewer.name}
          //   avatar={interviewer.avatar}
          //   // selected={props.value === interviewer.id}
          //   selected={props.interviewer === interviewer.id}
          //   setInterviewer={(event) => props.onChange(interviewer.id)}
          // />
          return (
            <InterviewerListItem
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              // selected={interviewer.id === props.value}
              selected={interviewer.id === props.interviewer}
              setInterviewer={event => props.onChange(interviewer.id)}
              // setInterviewer={event => props.setInterviewer(interviewer.id)}
            />

        )}

        )}
      </ul>
    </section>
)};