import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CINEMA } from 'src/app/moduls/cinema';
import { USERS } from 'src/app/moduls/users';
import { FormService } from 'src/app/services/form.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.scss']
})
export class ImportantComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<ImportantComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userServ:UsersService, private form:FormService) {}

  currentUser!:USERS
  basketUser:any
  usersSubscriber:any

 

  ngOnInit(): void {
    const formData = this.form.getFormData();
    if (formData && formData.value) {
      if(this.userServ.isAuth) {
        this.usersSubscriber = this.userServ.getUsers().subscribe((data:any) => {
          const user = data.find((item:USERS) => item.email === formData.value.email);
          this.currentUser = user
          if(user && user.basket) {
            this.basketUser = user.basket;
          }
        });
      }
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
