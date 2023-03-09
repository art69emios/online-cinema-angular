import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CINEMA } from 'src/app/moduls/cinema';
import { USERS } from 'src/app/moduls/users';
import { CinemaDataService } from 'src/app/services/cinema-data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss']
})
export class CinemaComponent implements OnInit, OnDestroy {

  constructor(private cinemaService: CinemaDataService, public userServ:UsersService, private router:Router){}

  cinemaData:any
  cinemaDataSubscriber:any
  
  usersSubscriber:any

  searchValue!:string
  messageError:string = ''
  flag!: boolean
  flagR!: boolean
  currentUser!:USERS


  ngOnInit(): void {
    this.cinemaDataSubscriber = this.cinemaService.getCinema().subscribe(data =>{
      this.cinemaData = data
    } )
    this.userServ.isCurrentUser().then((data:any) =>{
      this.currentUser = data.email
    } )
  }

  addToBasket(cinema: CINEMA, event:Event) {

    if(event.target instanceof HTMLElement){
      event.target.innerHTML = 'bookmark'
    }

    if (!this.userServ.isAuth) {
      this.router.navigate(['login']);
    }

    cinema.quality = 1;
    cinema.isDone = false


      this.userServ.getCurrentUser().subscribe(data => {
        console.log(data);
        
        if(data && data.basket){
          let usersData = data
          if(usersData){
          let findBasket = usersData.basket.find((item: CINEMA) => item.id === cinema.id);
          if (findBasket){
            findBasket.quality += 1;
            this.userServ.updateUsers(usersData).subscribe();
          }else{
            usersData.basket.push(cinema);
            this.userServ.updateUsers(usersData).subscribe();
          }
          }

        }

      })
  }
  
  searchItems(search: string) {
    this.cinemaService.getCinema().subscribe(data => {
      this.cinemaData = data;
      this.cinemaData.results = this.cinemaData.results.filter((item: CINEMA) => {
          return item.title.toLowerCase().includes(search.toLowerCase());
      });

      if (this.cinemaData.results.length === 0) {
        this.messageError = `Not Founded ${search}`;
      } else {
        this.messageError = '';
      }
    });
  }

  sortDate() {
    this.flag = true
    this.cinemaService.getCinema().subscribe(data => {
      this.cinemaData = data;
        this.cinemaData.results = this.cinemaData.results.sort((a: CINEMA, b: CINEMA) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    });
  }

  sortDateLess(){
    this.flag = false
    this.cinemaService.getCinema().subscribe(data => {
      this.cinemaData = data;
        this.cinemaData.results = this.cinemaData.results.sort((a: CINEMA, b: CINEMA) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    });
  } 

  sortRating(){
    this.flagR = false
    this.cinemaService.getCinema().subscribe(data => {
      this.cinemaData = data;
      this.cinemaData.results = this.cinemaData.results.sort((a: CINEMA, b: CINEMA) => a.vote_average - b.vote_average)
    })
  }

  sortRatingLess(){
    this.flagR = true
    this.cinemaService.getCinema().subscribe(data => {
      this.cinemaData = data;
      this.cinemaData.results = this.cinemaData.results.sort((a: CINEMA, b: CINEMA) => b.vote_average - a.vote_average)
    })
  }

  logOut(){
    this.userServ.logoutUser()
    
  }

  ngOnDestroy(): void {
    if(this.cinemaDataSubscriber) this.cinemaDataSubscriber.unsubscribe()
    if(this.usersSubscriber) this.usersSubscriber.unsubscribe()
  }

}
