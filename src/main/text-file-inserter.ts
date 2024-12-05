import { TextFileInserter } from "../application/text-file-inserter.js";
import { FirebaseStorageFileRepository } from "../infrastructure/firebase/firebase-storage-file-repository.js";
import { firebaseApp } from "./firebase-app.js";

export const textFileInserter = new TextFileInserter(
  new FirebaseStorageFileRepository(firebaseApp),
);
