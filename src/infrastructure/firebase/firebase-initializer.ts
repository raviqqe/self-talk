import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import configuration from "../../configuration.json";

const { apiKey, projectId } = configuration.firebase;

firebase.initializeApp({
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  projectId
});

export class FirebaseInitializer {
  public async initialize() {
    await firebase.firestore().enablePersistence();
  }
}
