import { Gender } from './../models/api-models/gender.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GendersService {
  private baseApiUrl = "https://localhost:44365";

  constructor(private httpClient: HttpClient) { }

  getGendersList(): Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/genders');
  }
}
