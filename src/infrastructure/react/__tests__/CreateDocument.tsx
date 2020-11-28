import { create } from "react-test-renderer";
import { CreateDocument } from "../CreateDocument";

it("renders", () => {
  expect(
    create(
      <CreateDocument
        createDocument={async () => {}}
        insertFiles={async () => "url"}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
