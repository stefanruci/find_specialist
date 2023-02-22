import firebase from "firebase/compat";
import {Timestamp} from "rxjs";

export interface Feed {
    id: string;
    userName: string;
    tittle: string;
    pershkrim: string;
    time: Date;
    userType: string;
    vendodhja: string;
    kompania?: string;
    tel?:string
    whatsApp?:string
}