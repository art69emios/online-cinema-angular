import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CINEMA } from '../moduls/cinema';

@Injectable({
  providedIn: 'root'
})
export class CinemaDataService {

  constructor(private http: HttpClient) { }


  getCinema(){
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=90eb3126e63be5a94312f2ed0feef42b&language=en-US&page=1')
  }

  getCinemaById(id: number) {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=90eb3126e63be5a94312f2ed0feef42b&language=en-US&page=1')
      .pipe(
        map((data: any) => {
          const cinema = data.results.find((item: CINEMA) => item.id === id);
          return cinema;      
        })
      );
  }
  
}
