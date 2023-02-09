import { Injectable } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { rejects } from "assert";
import { resolve } from "dns";
import {
  createUserWithEmailAndPassword,
  EmailAuthCredential,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { BehaviorSubject, first, map, Observable } from "rxjs";
import { User } from "src/app/model/user/user.model";
import { ApiService } from "../api/api.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public _uid = new BehaviorSubject<any>(null);
  correctUser: any;
  correntUserId: string = "";
  isLogin: boolean = false;
  constructor(
    private auth: Auth,
    private afAuth: AngularFireAuth,
    private apiService: ApiService
  ) {}

  getCorrentUser(): Observable<User> {
    return this.apiService.getUserByEmail(this.auth.currentUser.email.trim());
  }

  getUserId(): string {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // User is signed in.
        console.log(user.uid);
        this.correntUserId = user.uid.trim();
      }
    });

    return this.correntUserId;
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const response = signInWithEmailAndPassword(this.auth, email, password);
      console.log(response);

      if ((await response).user) {
        this.setUserData((await response).user.uid);
        this.isLogin = true;
      }
    } catch (e) {
      this.isLogin = false;
      throw e;
    }
  }

  getId() {
    const auth = getAuth();
    this.correctUser = auth.currentUser;
    console.log(this.correctUser);
    return this.correctUser?.uid;
  }
  setUserData(uid) {
    this._uid.next(uid);
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async register(user: User) {
    try {
      const registeredUser = await createUserWithEmailAndPassword(
        this.auth,
        user.email,
        user.password
      );
      console.log("perdoruesi i regjistruar : ", registeredUser);

      const data = {
        id: registeredUser.user.uid,
        name: user.name.charAt(0).toUpperCase() + user.name.slice(1),
        lastName:
          user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1),
        username:
          user.username.charAt(0).toUpperCase() + user.username.slice(1),
        email: user.email,
        userType:
          user.userType.charAt(0).toUpperCase() + user.userType.slice(1),
        profilePictureUrl:
          "https://i.avatar/" + this.randomIntFromInterval(200, 400),
      };

      //add data on the firebase db
      await this.apiService.setDocument(
        "users/".concat(registeredUser.user.uid),
        data
      );
      const userData = {
        id: registeredUser.user.uid,
      };
    } catch (e) {
      throw e;
    }
  }

  async resetUserPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email).catch((e) => {
        throw e;
      });
    } catch (e) {
      throw e;
    }
  }
  async logout() {
    try {
      await this.auth.signOut();
      this._uid.next(null);
      return true;
    } catch (e) {
      throw e;
    }
  }

  checkAuth(): Promise<any> {
    return new Promise((resolve, rejects) => {
      onAuthStateChanged(this.auth, (user) => {
        // console.log("auth user: ", user);
        resolve(user);
      });
    });
  }

  async getUserData(id) {
    // return (await (this.apiService.collection('users').doc(id).get().toPromise())).data;
    return await (
      await this.apiService.getDocById("users/$(id)")
    ).data.toString;
    //   if (docSnap?.exists()) {
    //     return docSnap.data;
    //   } else {
    //     throw "No such doc exist";
    //   }
    // }
  }
}
