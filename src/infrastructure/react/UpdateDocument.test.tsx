import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UpdateDocument } from "./UpdateDocument";

it("renders", () => {
  expect(
    render(
      <UpdateDocument
        document={{ id: "", text: "" }}
        insertFiles={async () => ""}
        updateDocument={async () => {}}
      />
    ).container.firstChild
  ).toMatchSnapshot();
});
