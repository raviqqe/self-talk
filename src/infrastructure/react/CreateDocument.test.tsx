import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { CreateDocument } from "./CreateDocument.js";
import { documentCreator } from "../../main/document-creator.js";

it("renders", () => {
  vi.spyOn(documentCreator, "create").mockImplementation(async () => {});

  expect(
    render(<CreateDocument insertFiles={async () => "url"} />).container
      .firstChild,
  ).toMatchSnapshot();
});
