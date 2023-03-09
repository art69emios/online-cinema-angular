import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CINEMA } from 'src/app/moduls/cinema';
import { CinemaDataService } from 'src/app/services/cinema-data.service';

@Component({
  selector: 'app-cinema-details',
  templateUrl: './cinema-details.component.html',
  styleUrls: ['./cinema-details.component.scss']
})
export class CinemaDetailsComponent implements OnInit, OnDestroy{

  constructor(private activRouter:ActivatedRoute, private cinemaServ:CinemaDataService, private router: Router){}

  cinemaDetails!: CINEMA 
  cinemaDetailsSubscriber:any 
  id!:number 

  ngOnInit(): void {
    this.activRouter.params.forEach(item =>{
      this.id = +item['id']
      this.cinemaDetailsSubscriber = this.cinemaServ.getCinemaById(this.id).subscribe(data =>{
        this.cinemaDetails = data
      })
    })
  }


  back(){
    this.router.navigate(['cinema'])
  }


  ngOnDestroy(): void {
    if(this.cinemaDetailsSubscriber) this.cinemaDetailsSubscriber.unsubscribe()
  }
}
