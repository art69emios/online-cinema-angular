import { CINEMA } from "./cinema";

export interface USERS {
   id:number,
   email:string,
   password:string | number,
   basket:CINEMA[],
   date:Date,
   viewedCinema:CINEMA[]
}