import { IAuthenticationController } from "./authentication-controller";
import { IInfrastructureInitializer } from "./infrastructure-initializer";

export interface IInitialState {
  signedIn: boolean;
}

export class ApplicationInitializer {
  constructor(
    private readonly infrastructureInitializer: IInfrastructureInitializer,
    private readonly authenticationController: IAuthenticationController
  ) {}

  public async initialize(): Promise<IInitialState> {
    await this.infrastructureInitializer.initialize();
    return { signedIn: await this.authenticationController.isSignedIn() };
  }
}
