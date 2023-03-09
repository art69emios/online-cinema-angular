import { Component, OnDestroy, OnInit } from '@angular/core';
import { CINEMA } from 'src/app/moduls/cinema';
import { USERS } from 'src/app/moduls/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent  implements OnInit, OnDestroy{

  constructor(private userServ:UsersService){}

  userSubscriber:any
  userData!:CINEMA[]

  ngOnInit(): void {
      this.userSubscriber = this.userServ.getCurrentUser().subscribe((data:any) => {
        if(data && data.basket) {
          let currentUser = data.basket.filter((item:CINEMA) => item.isDone === true);
          if(currentUser) {
            this.userData = currentUser;
          }
        }
      })
  }

  ngOnDestroy(): void {
    if(this.userSubscriber) this.userSubscriber.unsubscribe()
  }

}
