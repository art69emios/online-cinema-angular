import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { CINEMA } from '../moduls/cinema';
import { USERS } from '../moduls/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private router:Router, private http:HttpClient) { }

  isAuth:boolean = false
  currentUser!:USERS 

  getUsers(){
    return this.http.get<USERS>('http://localhost:3000/users')
  }


  postUsers(user:USERS){
    return this.http.post<USERS>('http://localhost:3000/users', user)
  }

  updateUsers(user:USERS){
    return this.http.put<USERS>(`http://localhost:3000/users/${user.id}`, user)
  }

  deleteUser(user:USERS){
    return this.http.delete<USERS>(`http://localhost:3000/users/${user.id}`)
  }

  updateBasket(userId: number, basket: CINEMA[]): Observable<USERS> {
    return this.http.patch<USERS>(`http://localhost:3000/users/${userId}`, { basket });
  }

  isAuthLog(){
    return new Promise(resolve => {
      setTimeout(() => {resolve(this.isAuth)},200)
    })
  }

  isCurrentUser(){
    return new Promise(resolve => {
      setTimeout(() => {resolve(this.currentUser)},200)
    })
  }

  getCurrentUser(): Observable<USERS> {
    return of(this.currentUser);
  }

  setCurrentUser(user: any): void {
    this.currentUser = user;
  }

  loginUser(email: string, password: string): Observable<boolean> {
    return this.http.get<USERS[]>('http://localhost:3000/users').pipe(
      map(users => users.find(user => user.email === email && user.password === password)),
      tap(user => {
        console.log(user);
        
        if (user) {
          this.isAuth = true;
          this.setCurrentUser(user);
        } else {
          this.isAuth = false;
          this.setCurrentUser(null);
        }
      }),
      map(user => !!user)
    );
  }

  logoutUser(): void {
    this.isAuth = false;
    this.setCurrentUser(null);
    this.router.navigate(['login']);
  }
}

