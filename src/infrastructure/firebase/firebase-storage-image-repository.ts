import * as firebase from "firebase/app";
import "firebase/storage";
import UUID from "pure-uuid";
import { IImageRepository } from "../../application/image-repository";

export class FirebaseStorageImageRepository implements IImageRepository {
  public async create(image: Blob): Promise<string> {
    const child = this.images().child(new UUID(4).format());
    await child.put(image);
    return child.getDownloadURL();
  }

  private images(): firebase.storage.Reference {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firebase
      .storage()
      .ref()
      .child("users")
      .child(user.uid)
      .child("images");
  }
}
