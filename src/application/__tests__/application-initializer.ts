import { ApplicationInitializer } from "../application-initializer";
import { IAuthenticationController } from "../authentication-controller";

it("initializes an application state", async () => {
  const authenticationController = { isSignedIn: jest.fn(async () => true) };
  const authenticationPresenter = { presentSignedIn: jest.fn() };
  const applicationInitializer = new ApplicationInitializer(
    authenticationController as unknown as IAuthenticationController,
    authenticationPresenter
  );

  await applicationInitializer.initialize();

  expect(authenticationPresenter.presentSignedIn.mock.calls).toEqual([[true]]);
});
