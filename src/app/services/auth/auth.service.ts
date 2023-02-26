import {Injectable} from "@angular/core";
import {Auth, user} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {rejects} from "assert";
import {resolve} from "dns";
import {
    createUserWithEmailAndPassword,
    EmailAuthCredential,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {BehaviorSubject, first, map, Observable} from "rxjs";
import {User} from "src/app/model/user/user.model";
import {ApiService} from "../api/api.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {RouterService} from "../routerService/router.service";
import {isLogin} from "ionic";

@Injectable({
    providedIn: "root",
})
export class AuthService {


    public _uid = new BehaviorSubject<any>(null);
    correctUser: any;
    userType: string = 'U';
    currentUserId: string = "";
    isLogin: boolean;

    constructor(
        private routerService: RouterService,
        private auth: Auth,
        private afAuth: AngularFireAuth,
        private apiService: ApiService,
        private alertController: AlertController
    ) {
        if (this.isLogin == true) {

            this.getCurrentUser().subscribe(el => {
                this.userType = el.data().userType.charAt(0).toUpperCase();
                console.log(this.userType, '=usertype')


            })
        }


        this.checkAuth().then(res => {
            this.isLogin = true;
            this.getCurrentUser().subscribe(el => {
                this.userType = el.data().userType.charAt(0).toUpperCase();
                console.log(this.userType, '=usertype')


            })
        }).catch(e => {
            this.isLogin = false;
        })

    }

    getCurrentUser() {
        this.getUserId()

        console.log(this.currentUserId, "id on authService", this.auth.currentUser.uid);
        return this.apiService.getUser(this.auth.currentUser.uid);

    }

    getUserId(): string {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                // User is signed in.
                console.log(user.uid);
                this.currentUserId = user.uid;
            }
        });

        return this.currentUserId;
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const response = signInWithEmailAndPassword(this.auth, email, password)
            console.log(response);

            if ((await response).user) {
                this.setUserData((await response).user.uid);
                this.isLogin = true;
                this.correctUser = await this.getUserData(this._uid);
                this.getCurrentUser().subscribe(el => {
                    this.userType = el.data().userType.charAt(0).toUpperCase();
                    console.log(this.userType, '=usertype')
                    sessionStorage.setItem('userName', el.data().username);
                    sessionStorage.setItem('userType', this.userType);
                    this.currentUserId = el.data().id;

                })
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

        await this.auth.signOut().then(res => {
            this.isLogin = false;
            this.userType = 'U';
            this._uid.next(null);


        }).catch(err => {
            throw err;
        });

        return true;

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
        ;
        await (
            await this.apiService.getDocById("users/$(id)")
        ).data();
        //   if (docSnap?.exists()) {
        //     return docSnap.data;
        //   } else {
        //     throw "No such doc exist";
        //   }
        // }
    }

    deleteAccount(user: User) {
        return this.auth.currentUser.delete().then(r => {
            console.log(user, "Deleted")
            this.deleteUserData(user);
            this.logout().then(r => {

                this.routerService.navigate("/login").then(r => {
                });


            });
        }).catch(e => {
            this.showAlert(e.code).then(r => {
            });
        })

    }
    async showAlert(msg) {
        const alert = await this.alertController.create({
            header: "Alert?",
            cssClass: "custom-alert",
            message: msg,
            buttons: ["OK"],
        });
        await alert.present();
    }

    private deleteUserData(user: User) {

        this.apiService.deleteUserData(user.id).then(r => {
            this.isLogin = false;
            this.userType = 'U';
            this._uid.next(null);
            this.correctUser = null;
            this.apiService.deleteUserFeeds(user);

        });
    }

    changePass(newPass: string) {
        return this.afAuth.currentUser.then((user) => {
            user.updatePassword(newPass)
                .then(() => {
                    console.log('Password changed successfully');
                })
                .catch((error) => {
                    console.error('Error changing password:', error);
                });
        });
    }


}
