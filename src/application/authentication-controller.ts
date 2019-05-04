export interface IAuthenticationController {
  signIn(): Promise<boolean>;
  signOut(): Promise<boolean>;
  isSignedIn(): Promise<boolean>;
}
