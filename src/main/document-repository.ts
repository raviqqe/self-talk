import { FirestoreDocumentRepository } from "../infrastructure/firebase/firestore-document-repository.js";
import { firebaseApp } from "./firebase-app.js";

export const documentRepository = new FirestoreDocumentRepository(firebaseApp);
