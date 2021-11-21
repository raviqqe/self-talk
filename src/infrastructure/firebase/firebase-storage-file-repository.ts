import { FirebaseApp } from "firebase/app";
import UUID from "pure-uuid";
import { IFileRepository } from "../../application/file-repository";
import {
  ref,
  FirebaseStorage,
  getStorage,
  StorageReference,
  updateMetadata,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { Auth, getAuth } from "firebase/auth";

export class FirebaseStorageFileRepository implements IFileRepository {
  private readonly auth: Auth;
  private readonly storage: FirebaseStorage;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.storage = getStorage(app);
  }

  public async create(file: Blob): Promise<string> {
    const child = ref(this.files(), new UUID(4).format());

    await uploadBytes(child, file);
    await updateMetadata(child, {
      cacheControl: `max-age=${60 * 60 * 24 * 365}`,
    });

    return getDownloadURL(child);
  }

  private files(): StorageReference {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return ref(this.storage, `users/${user.uid}/files`);
  }
}
