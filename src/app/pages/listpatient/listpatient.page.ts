/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { Observable } from 'rxjs';

import { getLatestData } from 'src/app/components/utilities';
import { MedicalData } from 'src/app/models/medicaldata';
@Component({
  selector: 'app-listpatient',
  templateUrl: './listpatient.page.html',
  styleUrls: ['./listpatient.page.scss'],
})
export class ListpatientPage implements OnInit {

  mode: any;
  patientData: Observable<any>;
  nameFilter: string;

  criticalPatientData: any;
  listData: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private restService: RestService) {
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    console.log(`listpatient mode=${this.mode}`);
  }

  ngOnInit() {
    this.restService.showLoader().then(()=>{
      this.patientData = this.restService.getPatientByName('');
      this.patientData
      .subscribe(respData => {
        //console.log('ListpatientPage, respData: ' + JSON.stringify(respData));
        this.criticalPatientData = this.filterCriticalPatients(respData);
        if (this.mode === 'all') {
          this.listData = respData;
        } else {
          this.listData = this.criticalPatientData;
        }
        this.restService.stopLoader();
        //console.log('ListpatientPage, criticalPatientData: ' + JSON.stringify(this.criticalPatientData));
      });
    });
  }

  filterCriticalPatients = (inPatient: any) => {
    //console.log('ListpatientPage, filterCriticalPatients running. inPatient:' + JSON.stringify(inPatient));
    if (inPatient !== null) {
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      const criticalPatients = inPatient.filter(function(item: any){
        const recentData = getLatestData(item.medicaldata, 'sortkey');
        if (recentData === undefined || recentData == null)
          {return false;}
        else if (recentData.systolic_pressure > 200 || recentData.systolic_pressure < 100)
          {return true;}
        else if (recentData.diastolic_pressure > 150 || recentData.diastolic_pressure < 60)
          {return true;}
        else if (recentData.respiratory_rate > 16 || recentData.respiratory_rate < 12)
          {return true;}
        else if (recentData.oxygen_level < 95)
          {return true;}
        else if (recentData.heartbeat_rate > 100 || recentData.heartbeat_rate < 60)
          {return true;}
        else {
          return false;
        }
      });
      return (criticalPatients);
    }
  };

  btnCriticalClick() {
    console.log('ListpatientPage, btnCriticalClick() running...');
    this.listData = this.criticalPatientData;
  }

  openViewPages(inPid: string, medicaldata: MedicalData[]) {
    console.log('ListpatientPage, openViewPages(), pid: ' + inPid);
    const recentData = getLatestData(medicaldata, 'sortkey');
    const navigationExtras: NavigationExtras = {
      state: {
        parent: this.mode,
        pid: inPid,
        mid: recentData ===null ? 0 : recentData._id
      }
    };
    this.router.navigate(['tabnav'], navigationExtras);
  }
}
