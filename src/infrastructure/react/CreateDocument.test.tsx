import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { documentCreator } from "../../main/document-creator.js";
import { CreateDocument } from "./CreateDocument.js";

it("renders", () => {
  vi.spyOn(documentCreator, "create").mockImplementation(async () => {});

  expect(render(<CreateDocument />).container.firstChild).toMatchSnapshot();
});
