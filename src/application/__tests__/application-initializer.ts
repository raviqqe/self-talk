import { ApplicationInitializer } from "../application-initializer";
import { IAuthenticationController } from "../authentication-controller";
import { IInfrastructureInitializer } from "../infrastructure-initializer";

describe(ApplicationInitializer.name, () => {
  let initializeMock: jest.Mock;
  let isSignedInMock: jest.Mock;
  let initializer: ApplicationInitializer;

  beforeEach(() => {
    initializeMock = jest.fn();
    isSignedInMock = jest.fn();
    initializer = new ApplicationInitializer(
      {
        initialize: initializeMock
      } as IInfrastructureInitializer,
      ({
        isSignedIn: isSignedInMock
      } as unknown) as IAuthenticationController
    );
  });

  it("initializes an application state", async () => {
    await initializer.initialize();
    expect(initializeMock.mock.calls).toHaveLength(1);
    expect(isSignedInMock.mock.calls).toHaveLength(1);
  });
});
