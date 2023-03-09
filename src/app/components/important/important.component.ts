import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CINEMA } from 'src/app/moduls/cinema';
import { USERS } from 'src/app/moduls/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.scss']
})
export class ImportantComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<ImportantComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userServ:UsersService) {}

  currentUser!:USERS
  basketUser:any
  usersSubscriber:any

 

  ngOnInit(): void {
      if(this.userServ.currentUser){
        this.usersSubscriber = this.userServ.getCurrentUser().subscribe((data:any) => {
          if(data && data.basket) {
            let currentUser = data.basket
            this.currentUser = data
            if(currentUser) {
              this.basketUser = currentUser;
              console.log(this.basketUser);
            }
          }
        })
      }
  }

  
  plusItem(cinema:CINEMA): void {
    cinema.quality += 1
    this.userServ.updateBasket(this.currentUser.id, this.basketUser).subscribe();
  }
  
  minusItem(cinema:CINEMA): void {
    if(cinema.quality === 1) cinema.quality = 1
    else cinema.quality -=1
    this.userServ.updateBasket(this.currentUser.id, this.basketUser).subscribe();
  }

  viewedCinema(cinema: CINEMA){
    cinema.isDone = true
    this.userServ.updateBasket(this.currentUser.id, this.basketUser).subscribe();
  }
  
  deleteCinema(cinema: USERS): void  {
    let idX = this.basketUser.findIndex((item: CINEMA) => item.id === cinema.id);
    this.basketUser.splice(idX, 1);
    this.userServ.updateBasket(this.currentUser.id, this.basketUser).subscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if(this.usersSubscriber) this.usersSubscriber.unsubscribe()
  }


}
