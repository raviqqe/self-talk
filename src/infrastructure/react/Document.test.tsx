import { create } from "react-test-renderer";
import { Document } from "../Document";

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
