import { create } from "react-test-renderer";
import { UpdateDocument } from "../UpdateDocument";

it("renders", () => {
  expect(
    create(
      <UpdateDocument
        document={{ id: "", text: "" }}
        insertFiles={async () => ""}
        updateDocument={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
