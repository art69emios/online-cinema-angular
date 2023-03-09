import { Component , OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USERS } from 'src/app/moduls/users';
import { FormService } from 'src/app/services/form.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy  {
  constructor(private formService: FormService,private router:Router, private userServ:UsersService){}

  form!:FormGroup
  email!:FormControl
  password!:FormControl

  usersData!:USERS
  usersDataSubscriber:any

 
  succesMessage:string = ''
  ngOnInit(): void {
    this.createControls()
    this.createForm()

    this.usersDataSubscriber = this.userServ.getUsers().subscribe(data => this.usersData = data)

  
  }

  createControls(){
    this.email = new FormControl('',[Validators.required])
    this.password = new FormControl('',Validators.required)
  }

  createForm(){
    this.form = new FormGroup({
      email: this.email,
      password: this.password
    })
  }


  onSubmit(form:FormGroup){
    this.formService.setFormData(form);
    
    const newUser:USERS = {
      email: form.value.email,
      password: form.value.password,
      basket: [],
      id: 0,
      date: new Date()
    };

    if(newUser){
      setTimeout(() =>{
        this.succesMessage = 'Loading'
      },500)
      setTimeout(() =>{
        this.succesMessage = 'Success! You are registered'
      },1500)
      setTimeout(() =>{
        this.router.navigate(['login'])
      },2500)
    }

    this.userServ.postUsers(newUser).subscribe()
  }

  goRegister(){
    this.router.navigate(['login'])
  }

ngOnDestroy(): void {
  if(this.usersDataSubscriber) this.usersDataSubscriber.unsubscribe()
}
}
