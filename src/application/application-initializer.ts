import { IAuthenticationController } from "./authentication-controller";

export interface IInitialState {
  signedIn: boolean;
}

export class ApplicationInitializer {
  constructor(
    private readonly authenticationController: IAuthenticationController
  ) {}

  public async initialize(): Promise<IInitialState> {
    return { signedIn: await this.authenticationController.isSignedIn() };
  }
}
