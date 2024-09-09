import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { CreateDocument } from "./CreateDocument.js";

it("renders", () => {
  expect(
    render(
      <CreateDocument
        createDocument={async () => {}}
        insertFiles={async () => "url"}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});
