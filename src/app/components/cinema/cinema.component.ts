import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CINEMA } from 'src/app/moduls/cinema';
import { USERS } from 'src/app/moduls/users';
import { CinemaDataService } from 'src/app/services/cinema-data.service';
import { FormService } from 'src/app/services/form.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss']
})
export class CinemaComponent implements OnInit, OnDestroy {

  constructor(private cinemaService: CinemaDataService, public userServ:UsersService,private formService: FormService, private router:Router){}

  cinemaData:any
  cinemaDataSubscriber:any
  
  usersData!:USERS
  usersSubscriber:any

  searchValue:any
  messageError:string = ''
  flag!: boolean
  flagR!: boolean
  currentUser!:USERS
  formGr!:FormGroup


  ngOnInit(): void {
    this.cinemaDataSubscriber = this.cinemaService.getCinema().subscribe(data =>{
      this.cinemaData = data
    } )
      
    this.usersSubscriber = this.userServ.getUsers().subscribe(data => {
        this.usersData = data
      })

      this.formService.formPromise().then((data:any) => {
        this.formGr = data
      })
      this.userServ.getCurrentUser().subscribe(
        data => console.log(data)
      )
  }

  addToBasket(cinema: CINEMA, event:Event) {

    if(event.target instanceof HTMLElement){
      event.target.innerHTML = 'bookmark'
    }

    if (!this.userServ.isAuth) {
      this.router.navigate(['login']);
    }

    const formData = this.formService.getFormData();
    cinema.quality = 1;
    cinema.isDone = false

    if (formData && formData.value) {
  
      this.userServ.getUsers().subscribe((data: any) => {
        let usersData = data
        const foundUser = usersData.find((user: USERS) => user.email === formData.value.email);
    
        if (foundUser) {
          let findBasket = foundUser.basket.find((item: CINEMA) => item.id === cinema.id);

          if (findBasket) {
            findBasket.quality += 1;
            this.userServ.updateUsers(foundUser).subscribe();
          } else {
            foundUser.basket.push(cinema);
            this.userServ.updateUsers(foundUser).subscribe();
          }
          
        } 
      });
    }
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
    this.userServ.isAuth = false
  }

  ngOnDestroy(): void {
    if(this.cinemaDataSubscriber) this.cinemaDataSubscriber.unsubscribe()
    if(this.usersSubscriber) this.usersSubscriber.unsubscribe()
  }

}
