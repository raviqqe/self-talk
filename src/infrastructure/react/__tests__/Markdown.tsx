import React from "react";
import { create } from "react-test-renderer";
import { Markdown } from "../Markdown";

it("renders correctly", () => {
  expect(create(<Markdown># Foo</Markdown>).toJSON()).toMatchSnapshot();
});
