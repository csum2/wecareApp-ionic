import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { MedicalData } from '../models/medicaldata';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  baseUrl = 'https://rest-wecare.herokuapp.com/';
  httpOptions = {
    headers: new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    })
  };

  isShowingLoader = false;
  loader: any;

  constructor(private http: HttpClient, public loadingController: LoadingController,) { }

  async showLoader() {
    if (!this.isShowingLoader) {
      this.isShowingLoader = true;
      this.loader = await this.loadingController.create({
        message: 'Please wait',
        duration: 6000
      });
      return await this.loader.present();
    }
  }
  async stopLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
      this.isShowingLoader = false;
    }
  }

  getPatientByName(patientName: string){
    return this.http.get(`${this.baseUrl}patientnames/${patientName}`);
  }

  getPatientById(pid: string){
    return this.http.get(`${this.baseUrl}patients/${pid}`);
  }

  getMedicalDataById(pid: string, mid: string){
    return this.http.get(`${this.baseUrl}patients/${pid}/medical/${mid}`);
  }

  addMedicalDataById(pid: string, newMedicaldata: MedicalData) {
    const uri = this.baseUrl + 'patients/' + pid + '/medical';
    //console.log('RestService, addMedicalDataById() uri: ' + uri);
    return this.http.post(uri, JSON.stringify(newMedicaldata), this.httpOptions);
  }

  updateMedicalDataById(pid: string, mid: string, newMedicaldata: MedicalData) {
    const uri = this.baseUrl + 'patients/' + pid + '/medical/' + mid;
    //console.log('RestService, updateMedicalDataById() uri: ' + uri);
    //console.log('RestService, updateMedicalDataById() newMedicaldata: ' + JSON.stringify(newMedicaldata));
    return this.http.patch(uri, JSON.stringify(newMedicaldata), this.httpOptions);
  }

  deleteMedicalDataById(pid: string, mid: string) {
    const uri = this.baseUrl + 'patients/' + pid + '/medical/' + mid;
    console.log('RestService, updateMedicalDataById() uri: ' + uri);
    return this.http.delete(uri, this.httpOptions);
  }

  addPatient(newPatient: Patient) {
    const uri = this.baseUrl + 'patients';
    console.log('RestService, addPatient() uri: ' + uri);
    return this.http.post(uri, JSON.stringify(newPatient), this.httpOptions);
  }

  updatePatientById(pid: string, newPatient: Patient) {
    const uri = this.baseUrl + 'patients/' + pid;
    console.log('RestService, updatePatientById() uri: ' + uri);
    console.log('RestService, updatePatientById() newPatient: ' + JSON.stringify(newPatient));
    return this.http.patch(uri, JSON.stringify(newPatient), this.httpOptions);
  }

  deletePatientById(pid: string) {
    const uri = this.baseUrl + 'patients/' + pid;
    console.log('RestService, deletePatientById() uri: ' + uri);
    return this.http.delete(uri, this.httpOptions);
  }
}
