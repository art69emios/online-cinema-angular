import { Component, OnDestroy, OnInit } from '@angular/core';
import { USERS } from 'src/app/moduls/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit , OnDestroy {
  constructor(private userServ:UsersService){}

  usersData:any
  usersSubscriber:any
  flag!:boolean

  ngOnInit(): void {

    this.usersSubscriber = this.userServ.getUsers().subscribe(data => {
      this.usersData = data
      console.log(this.usersData);
    })
    
  }

  sortUsers(){
    this.flag = true
      this.usersData = this.usersData.sort((a:USERS, b:USERS) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
  }

  sortUsersLess(){
    this.flag = false
      this.usersData = this.usersData.sort((a:USERS, b:USERS) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  deleteCinema(users:USERS){
      let indx = this.usersData.findIndex((item:USERS) => item.id === users.id)
      this.usersData.splice(indx, 1)
      this.userServ.deleteUser(users).subscribe()
  }

  ngOnDestroy(): void {
    if(this.usersSubscriber) this.usersSubscriber.unsubscribe()
  }

}
