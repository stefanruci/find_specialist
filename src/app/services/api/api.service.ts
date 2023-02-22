import {Injectable} from "@angular/core";
import {AngularFirestore,} from "@angular/fire/compat/firestore";
import {collectionData, doc, docData, Firestore, setDoc,} from "@angular/fire/firestore";
import {addDoc, collection, getDoc, getDocs, orderBy, OrderByDirection, query,} from "firebase/firestore";
import {first, map, Observable} from "rxjs";
import {User} from "src/app/model/user/user.model";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Feed} from "../../model/feed/feed.model";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private feedsCollection = this.db.collection<Feed>('feeds');
    private usersCollection = this.db.collection<User>('users');

    constructor(private firestore: Firestore, private db: AngularFirestore, private fireDatabase: AngularFireDatabase) {
    }

    filterFeedData(feedType: string) {
        return this.db.collection<Feed>('feeds', (ref) =>
            ref.where("userType", "==", feedType.charAt(0).toUpperCase()).orderBy("time", "desc")
        )
            .snapshotChanges()
            .pipe(map(feeds => feeds
                .map(feed => {
                    console.log(feed)
                    return {
                        id: feed.payload.doc.id,
                        ...feed.payload.doc.data()
                    } as Feed
                })));
        // return this.fireDatabase.list('/feeds', ref => ref.orderByChild('feedType').equalTo(feedType)).valueChanges();
    }

    getDocById(path) {
        const dataRef = this.docRef(path);
        return getDoc(dataRef);
    }

    getDocsByField(
        collectionName: string,
        fieldName: string,
        fieldValue: string,
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
                        location: data.location,
                        profilePictureUrl: data.profilePictureUrl,
                        pershkrim: data.pershkrim,
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
        const collection_data = collectionData<any>(dataRef, {idField: "id"}); // valuechanges, for doc use docData
        return collection_data;
    }

    docDataQuery(path, id?, queryFn?) {
        let dataRef: any = this.docRef(path);
        if (queryFn) {
            const q = query(dataRef, queryFn);
            dataRef = q;
        }
        let doc_data;
        if (id) doc_data = docData<any>(dataRef, {idField: "id"});
        else doc_data = docData<any>(dataRef); // valuechanges, for doc use docData
        return doc_data;
    }

    // whereQuery(fieldPath, condition, value) {
    //   return where(fieldPath, condition, value);
    // }

    orderByQuery(fieldPath, directionStr: OrderByDirection = "asc") {
        return orderBy(fieldPath, directionStr);
    }

    addFeed(feed: Feed) {
        return this.feedsCollection.doc(feed.id).set(feed).then(() => {
            console.log('Feed updated successfully!');
        })
            .catch(error => {
                console.error(error);
            });
        ;
    }

    updateFeedFieldById(id: string, pFeed: Partial<Feed>) {
        return this.feedsCollection.doc(id).update(pFeed).then(() => {
            console.log('Feed updated successfully!');
        })
            .catch(error => {
                console.error(error);
            });


    }

    deleteFeed(id: string) {
        return this.feedsCollection.doc(id).delete().then(() => {
            console.log('Feed updated successfully!');
        })
            .catch(error => {
                console.error(error);
            });


    }

    getFeed(id: string) {
        // return this.feedsCollection.doc(id).get();
        return this.feedsCollection.doc(id).get();
    }

    updateUser(id: string, user: Partial<User>) {

        return this.usersCollection.doc(id).update(user).then(() => {
            console.log('User updated successfully!');
        })
            .catch(error => {
                console.error(error);
            });


    }

    deleteUserData(user_id: string) {

        return this.usersCollection.doc(user_id).delete().then(() => {
            console.log('User deleted successfully!');

        })
            .catch(error => {
                console.error(error);
            });


    }


    deleteUserFeeds(user: User) {
        return this.filterFeedData(user.userType).subscribe(feeds => {
            feeds.forEach(feed => {
                if (feed.userName == user.username) {
                    this.deleteFeed(feed.id).then(r => {
                    }).catch((e) => {
                        throw(e);
                    });
                }

            })
        })
    }
}
