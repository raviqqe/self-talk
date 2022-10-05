import { create } from "react-test-renderer";
import { expect, it } from "vitest";
import { SignOut } from "./SignOut";

it("renders", () => {
  expect(create(<SignOut signOut={() => {}} />).toJSON()).toMatchSnapshot();
});
