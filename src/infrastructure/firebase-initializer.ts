import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import configuration from "../configuration.json";

export class FirebaseInitializer {
  public initialize() {
    const { apiKey, projectId } = configuration.firebase;

    firebase.initializeApp({
      apiKey,
      authDomain: `${projectId}.firebaseapp.com`,
      projectId
    });

    if (window.localStorage) {
      firebase.firestore().enablePersistence();
    }
  }
}
