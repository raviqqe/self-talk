import { IAuthenticationController } from "../authentication-controller";
import { SignInManager } from "../sign-in-manager";

describe(SignInManager.name, () => {
  let signInMock: jest.Mock;
  let signInManager: SignInManager;

  beforeEach(() => {
    signInMock = jest.fn();
    signInManager = new SignInManager(({
      signIn: signInMock
    } as unknown) as IAuthenticationController);
  });

  it("lists documents", async () => {
    await signInManager.signIn();
    expect(signInMock.mock.calls).toHaveLength(1);
  });
});
