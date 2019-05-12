import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export class FirebaseInitializer {
  constructor(projectId: string, apiKey: string) {
    firebase.initializeApp({
      apiKey,
      authDomain: `${projectId}.firebaseapp.com`,
      projectId
    });
  }

  public async initialize() {
    await firebase.firestore().enablePersistence();
  }
}
