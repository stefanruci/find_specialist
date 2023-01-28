import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialist } from '../model/specialists/specialist.model';
import { SpecialistServiceService } from '../services/specialist-service.service';

@Component({
  selector: 'app-add-specialists',
  templateUrl: './add-specialists.page.html',
  styleUrls: ['./add-specialists.page.scss'],
})
export class AddSpecialistsPage implements OnInit {

  specialistList: Specialist[]=[];

specialist:Specialist={
    name:'',
    surname:'',
    email:''
  }
  specialists:Specialist[]=this.specialistService.specialistList;
  constructor(private specialistService:SpecialistServiceService) {

   }


  ngOnInit(): void {
   this.specialistService.getSpecialists().subscribe(response=>this.specialistList=response);
  }



addSpecialist(){
    this.specialistService.addSpecialist(this.specialist).catch(res=>{
      console.log(res);
    });
console.log('works');
  }
}
