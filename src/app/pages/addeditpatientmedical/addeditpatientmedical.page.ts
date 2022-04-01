/* eslint-disable max-len */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { getLatestData, getISODate, getTime24hoursFormat } from 'src/app/components/utilities';
import { MedicalData } from 'src/app/models/medicaldata';

@Component({
  selector: 'app-addeditpatientmedical',
  templateUrl: './addeditpatientmedical.page.html',
  styleUrls: ['./addeditpatientmedical.page.scss'],
})
export class AddeditpatientmedicalPage implements OnInit {

  @ViewChild('documentEditForm')
  documentEditForm: FormGroupDirective;

  mode: any;
  titleMode: any;
  pid: any;
  mid: any;
  defaultDate: any;
  defaultTime: any;
  finishedLoading = false;
  patientData: any;
  medicalDataArray: any = [];
  medicalDataLatest: any;
  isSubmitted = false;

  ionicForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
      private restService: RestService,
      public formBuilder: FormBuilder,
      private navCtrl: NavController,
      public alertCtrl: AlertController
    ) {
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    this.titleMode = this.mode.charAt(0).toUpperCase() + this.mode.slice(1);
    this.pid = this.activatedRoute.snapshot.paramMap.get('pid');
    this.mid = this.activatedRoute.snapshot.paramMap.get('mid');
    console.log(`AddeditpatientmedicalPage, mode: ${this.mode}, pid: ${this.pid}, mid: ${this.mid}`);

    this.defaultDate = getISODate(new Date());
    this.defaultTime = getTime24hoursFormat(new Date());
    console.log(`AddeditpatientmedicalPage, defaultDate: ${this.defaultDate}, defaultTime: ${this.defaultTime}`);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.restService.showLoader().then(()=>{
      this.restService.getPatientById(this.pid)
        .subscribe(respData => {
          this.patientData = respData[0];
          this.medicalDataArray = this.patientData.medicaldata;
          this.medicalDataLatest = getLatestData(this.patientData.medicaldata, 'sortkey');
          //console.log('AddeditpatientmedicalPage, patientData: ' + JSON.stringify(this.patientData));
          console.log('AddeditpatientmedicalPage, medicalDataLatest: ' + JSON.stringify(this.medicalDataLatest));
          if (this.medicalDataLatest === null) {
            this.mode = 'add';
          }
          if (this.mode !== 'add') {
            this.defaultDate = this.medicalDataLatest.measuring_date;
            this.defaultTime = this.medicalDataLatest.measuring_time;
          }
          this.createForm();
          this.finishedLoading = true;
          this.restService.stopLoader();
        });
    });
  }

  createForm() {
    this.ionicForm = new FormGroup({
      measuringdate : new FormControl(
        this.defaultDate,
        [Validators.required,
          Validators.pattern('(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))')]
        ),
      measuringtime : new FormControl(
        this.defaultTime,
        [Validators.required,
        Validators.pattern('([01][0-9]|2[0-3]):([0-5][0-9])')]
      ),
      systolic : new FormControl(this.mode === 'add' ? '' : this.medicalDataLatest.systolic_pressure, [Validators.min(0)]),
      diastolic : new FormControl(this.mode === 'add' ? '' : this.medicalDataLatest.diastolic_pressure, [Validators.min(0)]),
      respiratory : new FormControl(this.mode === 'add' ? '' : this.medicalDataLatest.respiratory_rate, [Validators.min(0)]),
      oxygen : new FormControl(this.mode === 'add' ? '' : this.medicalDataLatest.oxygen_level, [Validators.min(0), Validators.max(100)]),
      heartbeat : new FormControl(this.mode === 'add' ? '' : this.medicalDataLatest.heartbeat_rate, [Validators.min(0), Validators.max(500)])
    });
  }

  changeDateValue() {
    this.defaultDate = this.ionicForm.value.measuringdate;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('AddeditpatientmedicalPage, submitForm(). Please provide all the required values!');
      return false;
    } else {
      console.log(this.ionicForm.value);
      //console.log(this.ionicForm.value.measuringdate);
      if (this.mode === 'add') {
        const httpData = this.buildNewDataFromAdd(this.ionicForm.value);
        this.restService.showLoader().then(()=>{
          this.restService.addMedicalDataById(this.pid, httpData)
          .subscribe(
            resp => { console.log(resp); },
            err => { console.log('AddeditpatientmedicalPage, http error' + err);
              this.restService.stopLoader();
              this.showAlertError(err);
            },
            () => {
              this.restService.stopLoader();
              this.showAlertSuccess();
            }
          );
        });
      } else {
        const httpData = this.buildNewDataFromEdit(this.ionicForm.value, this.mid);
        this.restService.showLoader().then(()=>{
          this.restService.updateMedicalDataById(this.pid, this.mid, httpData)
          .subscribe(
            resp => { console.log(resp); },
            err => { console.log(err);
              this.restService.stopLoader();
              this.showAlertError(err);
            },
            () => {
              this.restService.stopLoader();
              this.showAlertSuccess();
            }
          );
        });
      }
    }
  }

  buildNewDataFromAdd(inData: any) {
    const newEntry = new MedicalData();
    newEntry.sortkey = (inData.measuringdate + inData.measuringtime).replace(/-/g, '').replace(/:/g, '');
    newEntry.measuring_date = inData.measuringdate;
    newEntry.measuring_time = inData.measuringtime;
    newEntry.systolic_pressure = inData.systolic;
    newEntry.diastolic_pressure = inData.diastolic;
    newEntry.respiratory_rate = inData.respiratory;
    newEntry.oxygen_level = inData.oxygen;
    newEntry.heartbeat_rate = inData.heartbeat;
    return newEntry;
  }

  buildNewDataFromEdit(inData: any, oldId: string) {
    const newEntry = this.buildNewDataFromAdd(inData);
    // keep the old Id for the edited record
    // eslint-disable-next-line no-underscore-dangle
    newEntry._id = oldId;
    return newEntry;
  }

  async showAlertSuccess() {
    const alert = await this.alertCtrl.create({
      cssClass: 'basic-alert',
      header: 'WeCare',
      subHeader: 'Medical Data',
      message: 'saved successfully!',
      buttons: [{
        text: 'OK',
        handler: data => {
          //this.navCtrl.back();
          this.navCtrl.navigateRoot('/home');
        }
      }]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  async showAlertError(err: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'basic-alert',
      header: 'WeCare',
      subHeader: 'Medical Data Saving Error',
      message: err.message,
      buttons: ['CONTINUE']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }
}
