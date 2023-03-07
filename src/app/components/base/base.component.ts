import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CINEMA } from 'src/app/moduls/cinema';
import { USERS } from 'src/app/moduls/users';
import { FormService } from 'src/app/services/form.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent  implements OnInit, OnDestroy{

  constructor(private userServ:UsersService, private formServ:FormService){}

  userSubscriber:any
  userData!:CINEMA[]
  formData!: FormGroup

  ngOnInit(): void {
    this.formData = this.formServ.getFormData()
    if(this.formData && this.formData.value)
    this.userSubscriber = this.userServ.getUsers().subscribe((data:any) => {
      let currentUser = data.find((item:USERS) =>  item.email === this.formData.value.email)
      if(currentUser && currentUser.basket){
        this.userData = currentUser.basket.filter((item:CINEMA) => item.isDone === true)
        console.log(this.userData);
      }
    })
  }

  ngOnDestroy(): void {
    if(this.userSubscriber) this.userSubscriber.unsubscribe()
  }

}
