import {Moment} from "moment";


export interface Feed {
    id: string;
    userName: string;
    tittle: string;
    pershkrim: string;
    time: Moment;
    userType: string;
    vendodhja: string;
    kompania?: string;
    tel?:string
    whatsApp?:string
}