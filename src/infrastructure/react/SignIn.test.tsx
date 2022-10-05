import { create } from "react-test-renderer";
import { expect, it } from "vitest";
import { SignIn } from "./SignIn";

it("renders", () => {
  expect(create(<SignIn signIn={() => {}} />).toJSON()).toMatchSnapshot();
});
