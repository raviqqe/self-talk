import { create } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import { Document } from "./Document";

it("renders", () => {
  expect(
    create(
      <Document
        document={{ id: "id", text: "text" }}
        insertFiles={async () => "url"}
        updateDocument={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
