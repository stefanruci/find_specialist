import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Specialist } from '../model/specialists/specialist.model';

@Injectable({
  providedIn: 'root',
})
export class SpecialistServiceService {
// private specialistListRef =this.db.list<Specialist>('specialist-list');
 private specialistListRef =this.db.list<Specialist>('specialist-list');
 private specialistListReff =this.firestore.collection('specialist-list');
  specialists: Specialist[] =[];

  constructor(private db : AngularFireDatabase
    ,private firestore:AngularFirestore){
this.getSpecialists;
  }

  getSpecialistListRef(){
     console.log(this.specialistListRef)
    return this.specialistListRef;
  }


  items: Observable<any[]> | undefined;

  addSpecialist(specialist:Specialist){
    // return this.specialistListRef.push(specialist).then(s=>{
    //   console.log(s.key);
    // });

const id = '123'.concat(specialist.surname);
specialist.key=id;


// .forEach(val=>console.log(val));
    return this.specialistListReff.doc(id).set(specialist)
    .then(s=>{
      console.log(id);
    });
  }


  getSpecialists(){
return this.firestore.collection<Specialist>('specialist-list').snapshotChanges()
 .pipe(map(specialists => specialists.map(specialist => {
        return {
            id: specialist.payload.doc.id,
            ...specialist.payload.doc.data()
        } as Specialist
    })));;
  // subscribe(specialists=>this.specialistList=specialists)

}
specialistList:Specialist[]=[];
}
