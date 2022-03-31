import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { getLatestData } from 'src/app/components/utilities';
import { MedicalData } from 'src/app/models/medicaldata';
@Component({
  selector: 'app-viewpatientmedical',
  templateUrl: './viewpatientmedical.page.html',
  styleUrls: ['./viewpatientmedical.page.scss'],
})
export class ViewpatientmedicalPage implements OnInit {

  //parent page can be (all) patients or (critial) patients
  parent: any;
  pid: any;
  mid: any;
  finishedLoading = false;
  patientData: any;
  medicalDataArray: any = [];
  medicalDataLatest: any;
  isMedicalDataFound = false;

  constructor(private route: ActivatedRoute,
      private router: Router,
      private restService: RestService,
      private navCtrl: NavController,
      public alertCtrl: AlertController
    ) {
    console.log('ViewpatientmedicalPage');
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.parent = this.router.getCurrentNavigation().extras.state.parent;
        this.pid = this.router.getCurrentNavigation().extras.state.pid;
        this.mid = this.router.getCurrentNavigation().extras.state.mid;
      }
      console.log(`ViewpatientmedicalPage, parent: ${this.parent}, pid: ${this.pid}, mid: ${this.mid}`);
    });
  }

  ngOnInit() {
    this.restService.showLoader().then(()=>{
      this.restService.getPatientById(this.pid)
        .subscribe(respData => {
          this.patientData = respData[0];
          this.medicalDataArray = this.patientData.medicaldata;
          this.medicalDataLatest = getLatestData(this.patientData.medicaldata, 'sortkey');
          //console.log('ViewpatientmedicalPage, patientData: ' + JSON.stringify(this.patientData));
          //console.log('ViewpatientmedicalPage, medicalDataLatest: ' + JSON.stringify(this.medicalDataLatest));
          if (this.medicalDataLatest === null) {
            console.log('AddeditpatientmedicalPage, no medical data for the patient');
            this.isMedicalDataFound = false;
          } else {
            this.isMedicalDataFound = true;
          }
          this.finishedLoading = true;
          this.restService.stopLoader();
        });
    });
  }

  goEdit() {
    console.log('ViewpatientmedicalPage, goEdit()');
    this.router.navigate([`/addeditpatientmedical/edit/${this.pid}/${this.mid}`]);
  }

  deleteThis() {
    console.log('ViewpatientmedicalPage, deleteThis()');
    this.restService.showLoader().then(()=>{
      this.restService.deleteMedicalDataById(this.pid, this.mid)
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

  async showAlertSuccess() {
    const alert = await this.alertCtrl.create({
      cssClass: 'basic-alert',
      header: 'WeCare',
      subHeader: 'Medical Data',
      message: 'is deleted successfully!',
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
      subHeader: 'Medical Data delete Error',
      message: err.message,
      buttons: ['CONTINUE']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

}
