import { IAuthenticationController } from "../authentication-controller";
import { SignOutManager } from "../sign-out-manager";

let signOutMock: jest.Mock;
let signOutManager: SignOutManager;

beforeEach(() => {
  signOutMock = jest.fn();
  signOutManager = new SignOutManager(({
    signOut: signOutMock
  } as unknown) as IAuthenticationController);
});

it("signs out", async () => {
  await signOutManager.signOut();
  expect(signOutMock.mock.calls).toHaveLength(1);
});
