import type { FirebaseApp } from "firebase/app";
import {
  type Auth,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  type User,
} from "firebase/auth";
import type { AuthenticationController } from "../../application/authentication-controller.js";
import { sleep } from "../../domain/utilities.js";

export class FirebaseAuthenticationController
  implements AuthenticationController
{
  private readonly auth: Auth;
  private signedIn: boolean | null = null;

  public constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.auth.onAuthStateChanged((user: User | null): void => {
      this.signedIn = !!user;
    });
  }

  public async signIn(): Promise<void> {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  public async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  public async isSignedIn(): Promise<boolean> {
    while (this.signedIn === null) {
      await sleep(10);
    }

    return this.signedIn;
  }
}
