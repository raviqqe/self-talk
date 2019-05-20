import React from "react";
import { create } from "react-test-renderer";
import { TextArea } from "../TextArea";

it("renders", () => {
  expect(
    create(<TextArea onSubmit={() => undefined} />).toJSON()
  ).toMatchSnapshot();
});
