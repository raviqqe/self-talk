import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

type FirebaseConfiguration = Required<
  Pick<FirebaseOptions, "apiKey" | "authDomain" | "projectId">
>;

export class FirebaseInitializer {
  constructor(private readonly configuration: FirebaseConfiguration) {}

  public initialize(): FirebaseApp {
    const app = initializeApp(this.configuration);

    return app;
  }
}
