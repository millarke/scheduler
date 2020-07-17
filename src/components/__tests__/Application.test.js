import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

  // const appointments = getAllByTestId(container, "appointment");
  // console.log(prettyDOM(appointments));

  it("changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));

      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  ///////// ALTERNATIVE version of above, keep for reference ///////////

  // it("changes the schedule when a new day is selected", async () => {
  //   const { getByText } = render(<Application />);

  //   await waitForElement(() => getByText("Monday"));

  //   fireEvent.click(getByText("Tuesday"));

  //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
  // });
  ////////
  ////////

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { name: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(container));
  });


});