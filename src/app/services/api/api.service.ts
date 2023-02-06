import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
} from "@angular/fire/compat/firestore";
import {
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
} from "@angular/fire/firestore";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  orderBy,
  OrderByDirection,
  query,
  where,
} from "firebase/firestore";
import { first, map, Observable } from "rxjs";
import { User } from "src/app/model/user/user.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private firestore: Firestore, private db: AngularFirestore) {}

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

  docRef(path) {
    return doc(this.firestore, path);
  }

  collectionRef(path) {
    return collection(this.firestore, path);
  }

  setDocument(path, data) {
    const dataRef = this.docRef(path);
    return setDoc<any>(dataRef, data); //set()
  }

  addDocument(path, data) {
    const dataRef = this.collectionRef(path);
    return addDoc<any>(dataRef, data); //add()
  }

  getDocs(path, queryFn?) {
    let dataRef: any = this.collectionRef(path);
    if (queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    return getDocs<any>(dataRef); //get()
  }

  collectionDataQuery(path, queryFn?) {
    let dataRef: any = this.collectionRef(path);
    if (queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    const collection_data = collectionData<any>(dataRef, { idField: "id" }); // valuechanges, for doc use docData
    return collection_data;
  }

  docDataQuery(path, id?, queryFn?) {
    let dataRef: any = this.docRef(path);
    if (queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    let doc_data;
    if (id) doc_data = docData<any>(dataRef, { idField: "id" });
    else doc_data = docData<any>(dataRef); // valuechanges, for doc use docData
    return doc_data;
  }

  // whereQuery(fieldPath, condition, value) {
  //   return where(fieldPath, condition, value);
  // }

  orderByQuery(fieldPath, directionStr: OrderByDirection = "asc") {
    return orderBy(fieldPath, directionStr);
  }
}
