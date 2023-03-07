import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USERS } from 'src/app/moduls/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private router:Router,  private userServ:UsersService){}

  form!:FormGroup
  email!:FormControl
  password!:FormControl

  currentUser!: USERS 
  isAuth:boolean = false
  errorMessage:string = ''
  ngOnInit(): void {
    this.createControls()
    this.createForm()

   
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


  onSubmit(form: FormGroup){
  
    this.userServ.getUsers().subscribe((data:any) => {
      let usersArray = data;
      const user:USERS = usersArray.find((item: USERS) => form.value.email === item.email )
      if (user) {
        this.isAuth = true
        this.userServ.isAuth = this.isAuth
        this.userServ.loginUser(form.value.email, form.value.password).subscribe()
        this.router.navigate(['cinema'])
      }else{
        this.isAuth = false
        this.userServ.isAuth = this.isAuth
        this.errorMessage = 'error'
        setTimeout(()=>{
          this.router.navigate(['register'])
        },1000)
      }
    })
  }

  goRegister(){
    this.router.navigate(['register'])
  }

  


}
