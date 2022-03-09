import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  baseUrl = 'https://rest-wecare.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getPatientByName(patientName){
    return this.http.get(`${this.baseUrl}patientnames/${patientName}`);
  }
}
