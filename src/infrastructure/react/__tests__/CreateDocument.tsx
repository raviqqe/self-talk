import { render } from "@testing-library/react";
import { CreateDocument } from "../CreateDocument";

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
