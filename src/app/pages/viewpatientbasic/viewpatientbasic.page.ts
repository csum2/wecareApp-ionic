import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
@Component({
  selector: 'app-viewpatientbasic',
  templateUrl: './viewpatientbasic.page.html',
  styleUrls: ['./viewpatientbasic.page.scss'],
})
export class ViewpatientbasicPage implements OnInit {

  //parent page can be (all) patients or (critial) patients
  parent: any;
  pid: any;
  mid: any;
  finishedLoading = false;
  patientData: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private restService: RestService,
    private navCtrl: NavController,
    public alertCtrl: AlertController
) {
  console.log('ViewpatientbasicPage ');
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.parent = this.router.getCurrentNavigation().extras.state.parent;
        this.pid = this.router.getCurrentNavigation().extras.state.pid;
        this.mid = this.router.getCurrentNavigation().extras.state.mid;
      }
      console.log(`ViewpatientbasicPage, parent: ${this.parent}, pid: ${this.pid}, mid: ${this.mid}`);
    });
  }

  ngOnInit() {
    this.restService.showLoader().then(()=>{
      this.restService.getPatientById(this.pid)
        .subscribe(respData => {
          this.patientData = respData[0];
          console.log('ViewpatientbasicPage, patientData: ' + JSON.stringify(this.patientData));
          this.finishedLoading = true;
          this.restService.stopLoader();
        });
    });
  }

  goEdit() {
    console.log('ViewpatientbasicPage, goEdit()');
    this.router.navigate([`/addeditpatientbasic/edit/${this.pid}`]);
  }

  deleteThis() {
    console.log('ViewpatientbasicPage, deleteThis()');
    this.restService.showLoader().then(()=>{
      this.restService.deletePatientById(this.pid)
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
      subHeader: 'Patient info',
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
      subHeader: 'Patient info delete Error',
      message: err.message,
      buttons: ['CONTINUE']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }
}
