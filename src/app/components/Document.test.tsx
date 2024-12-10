import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Document } from "./Document.js";

it("renders", () => {
  expect(
    render(<Document document={{ id: "id", text: "text" }} />).container
      .firstChild,
  ).toMatchSnapshot();
});
