import { create } from "react-test-renderer";
import React from "react";
import { Markdown } from "../Markdown";

it("renders", () => {
  expect(create(<Markdown># Foo</Markdown>).toJSON()).toMatchSnapshot();
});
