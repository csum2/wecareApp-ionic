/* eslint-disable max-len */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { getISODate } from 'src/app/components/utilities';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-addeditpatientbasic',
  templateUrl: './addeditpatientbasic.page.html',
  styleUrls: ['./addeditpatientbasic.page.scss'],
})
export class AddeditpatientbasicPage implements OnInit {

  @ViewChild('documentEditForm')
  documentEditForm: FormGroupDirective;

  mode: any;
  titleMode: any;
  pid: any;
  mid: any;
  defaultDate: any;
  finishedLoading = false;
  patientData: any;
  isSubmitted = false;
  previousPage: any;

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
    console.log(`AddeditpatientbasicPage, mode: ${this.mode}, pid: ${this.pid}, mid: ${this.mid}`);

    this.defaultDate = getISODate(new Date());
    if (this.mode === 'add') {
      this.previousPage = '\home';
    } else {
      this.previousPage = '/tabs/viewpatientbasic';
    }
    console.log(`AddeditpatientbasicPage, defaultDate: ${this.defaultDate}`);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    if (this.mode === 'add') {
      this.createForm();
      this.finishedLoading = true;
    } else {
      this.restService.getPatientById(this.pid)
        .subscribe(respData => {
          //console.log('AddeditpatientmedicalPage, respData: ' + JSON.stringify(respData[0]));
          this.patientData = respData[0];
          if (this.patientData === null) {
            this.mode = 'add';
          }
          if (this.mode !== 'add') {
            this.defaultDate = this.patientData.date_of_birth;
          }
          this.createForm();
          this.finishedLoading = true;
          console.log('AddeditpatientmedicalPage, ngOnInit() patientData: ' + JSON.stringify(this.patientData));
          console.log('AddeditpatientmedicalPage, ngOnInit() mode after: ' + this.mode);
        });
    }
  }

  createForm() {
    this.ionicForm = new FormGroup({
      firstname : new FormControl(this.mode === 'add' ? '' : this.patientData.first_name, Validators.required),
      lastname : new FormControl(this.mode === 'add' ? '' : this.patientData.last_name, Validators.required),
      dateofbirth : new FormControl(
        this.defaultDate,
        [Validators.required,
          Validators.pattern('(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))')]
      ),
      biologicalsex : new FormControl(this.mode === 'add' ? '' : this.patientData.biological_sex.toLowerCase(), Validators.required),
      email : new FormControl(
        this.mode === 'add' ? '' : this.patientData.email,
        [Validators.required,
          Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)]
      ),
      contactphone : new FormControl(this.mode === 'add' ? '' : this.patientData.contact_phone, Validators.required),
      residentialaddress : new FormControl(this.mode === 'add' ? '' : this.patientData.residential_address, Validators.required),
      emergencycontact : new FormControl(this.mode === 'add' ? '' : this.patientData.emergency_contact),
      emergencyphone : new FormControl(this.mode === 'add' ? '' : this.patientData.emergency_phone),
      relationship : new FormControl(this.mode === 'add' ? '' : this.patientData.relationship),
    });
  }

  changeDateValue() {
    this.defaultDate = this.ionicForm.value.dateofbirth;
  }

  submitForm() {
    this.isSubmitted = true;
    console.log(this.ionicForm.value);
    if (!this.ionicForm.valid) {
      console.log('AddeditpatientmedicalPage, submitForm(). Please provide all the required values!');
      return false;
    } else {
      console.log(this.ionicForm.value);
      //console.log(this.ionicForm.value.measuringdate);
      if (this.mode === 'add') {
        const httpData = this.buildNewDataFromAdd(this.ionicForm.value);
        this.restService.addPatient(httpData)
        .subscribe(
          resp => { console.log(resp); },
          err => { console.log(err);
            this.showAlertError(err);
          },
          () => { this.showAlertSuccess(); }
        );
      } else {
        const httpData = this.buildNewDataFromEdit(this.ionicForm.value, this.pid);
        this.restService.updatePatientById(this.pid, httpData)
        .subscribe(
          resp => { console.log(resp); },
          err => { console.log(err);
            this.showAlertError(err);
          },
          () => { this.showAlertSuccess(); }
        );
      }
    }
  }

  buildNewDataFromAdd(inData: any) {
    const newEntry = new Patient();
    newEntry.first_name = inData.firstname;
    newEntry.last_name = inData.lastname;
    newEntry.date_of_birth = inData.dateofbirth;
    newEntry.biological_sex = inData.biologicalsex;
    newEntry.email = inData.email;
    newEntry.contact_phone = inData.contactphone;
    newEntry.residential_address = inData.residentialaddress;
    newEntry.emergency_contact = inData.emergencycontact;
    newEntry.emergency_phone = inData.emergencyphone;
    newEntry.relationship = inData.relationship;
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
      subHeader: 'Patient Data',
      message: 'saved successfully!',
      buttons: [{
        text: 'OK',
        handler: data => {
          this.navCtrl.back();
        }
      }]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  async showAlertError(err: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'basic-alert',
      header: 'WeCare',
      subHeader: 'Patient Data Saving Error',
      message: err,
      buttons: ['CONTINUE']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }
}
