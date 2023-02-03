import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
} from "@angular/fire/compat/firestore";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";
import { getDoc } from "firebase/firestore";
import { first, map, Observable } from "rxjs";
import { User } from "src/app/model/user/user.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private firestore: Firestore, private db: AngularFirestore) {}

  docRef(path) {
    return doc(this.firestore, path);
  }

  setDocument(path, data) {
    const dataRef = this.docRef(path);
    return setDoc<any>(dataRef, data);
  }
  getDocById(path) {
    const dataRef = this.docRef(path);
    return getDoc(dataRef);
  }

  getDocsByField(
    collectionName: string,
    fieldName: string,
    fieldValue: string
  ) {
    return this.db.collection(collectionName, (ref) =>
      ref.where(fieldName, "==", fieldValue)
    );
  }

  getUserByEmail(email: string): Observable<User> {
    console.log("Provided email", email);
    return this.getDocsByField("users", "email", email)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const action = actions[0];
          const data = action.payload.doc.data() as User;
          const user: User = {
            id: action.payload.doc.id,
            name: data.name,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            userType: data.userType,
            password: data.password,
            location: "",
            profilePictureUrl: "",
          };
          return user;
        }),
        first()
      );
  }
}
