import { render } from "@testing-library/react";
import { it, expect } from "vitest";
import { CreateDocument } from "./CreateDocument";

it("renders", () => {
  expect(
    render(
      <CreateDocument
        createDocument={async () => {}}
        insertFiles={async () => "url"}
      />
    ).container.firstChild
  ).toMatchSnapshot();
});
