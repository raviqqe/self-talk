import { create } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import { SignOut } from "./SignOut";

it("renders", () => {
  expect(create(<SignOut signOut={() => {}} />).toJSON()).toMatchSnapshot();
});
