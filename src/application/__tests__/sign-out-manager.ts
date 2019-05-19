import { IAuthenticationController } from "../authentication-controller";
import { SignOutManager } from "../sign-out-manager";

describe(SignOutManager.name, () => {
  let signOutMock: jest.Mock;
  let signOutManager: SignOutManager;

  beforeEach(() => {
    signOutMock = jest.fn();
    signOutManager = new SignOutManager(({
      signOut: signOutMock
    } as unknown) as IAuthenticationController);
  });

  it("lists documents", async () => {
    await signOutManager.signOut();
    expect(signOutMock.mock.calls).toHaveLength(1);
  });
});
