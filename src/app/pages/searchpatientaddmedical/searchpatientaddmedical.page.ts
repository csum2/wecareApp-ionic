import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-searchpatientaddmedical',
  templateUrl: './searchpatientaddmedical.page.html',
  styleUrls: ['./searchpatientaddmedical.page.scss'],
})
export class SearchpatientaddmedicalPage implements OnInit {

  patientData: Observable<any>;
  nameFilter: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private restService: RestService) {
    console.log(`searchpatient`);
  }

  ngOnInit() {
    this.restService.showLoader().then(()=>{
      this.patientData = this.restService.getPatientByName('');
      this.patientData.subscribe(respData => {
          this.restService.stopLoader();
        });
    });
  }

}
