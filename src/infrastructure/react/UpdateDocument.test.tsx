import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { UpdateDocument } from "./UpdateDocument.js";

it("renders", () => {
  expect(
    render(
      <UpdateDocument
        document={{ id: "", text: "" }}
        onSubmit={async () => {}}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});
