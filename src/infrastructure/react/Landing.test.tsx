import { create } from "react-test-renderer";
import { expect, it } from "vitest";
import { Landing } from "./Landing";

it("renders", () => {
  expect(
    create(<Landing repositoryURL="url" signIn={() => {}} />).toJSON()
  ).toMatchSnapshot();
});
