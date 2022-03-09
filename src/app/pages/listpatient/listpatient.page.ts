import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listpatient',
  templateUrl: './listpatient.page.html',
  styleUrls: ['./listpatient.page.scss'],
})
export class ListpatientPage implements OnInit {

  mode: any;
  patientData: Observable<any>;
  nameFilter: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private restService: RestService) {
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    console.log(`listpatient mode=${this.mode}`);
  }

  ngOnInit() {
    this.patientData = this.restService.getPatientByName('');
  }


  openViewPages(inPid) {
    console.log('ListpatientPage, openViewPages(), pid: ' + inPid);
    let navigationExtras: NavigationExtras = {
      state: {
        parent: this.mode,
        pid: inPid,
        mid: '61b7a4e0aa1d6e001639cc7f'
      }
    };
    this.router.navigate(['tabnav'], navigationExtras);
  }
}
