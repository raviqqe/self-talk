import { IAuthenticationController } from "./authentication-controller";

export class SignOutManager {
  constructor(
    private readonly authenticationController: IAuthenticationController
  ) {}

  public async signOut(): Promise<boolean> {
    return this.authenticationController.signOut();
  }
}
