import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addeditpatientbasic',
  templateUrl: './addeditpatientbasic.page.html',
  styleUrls: ['./addeditpatientbasic.page.scss'],
})
export class AddeditpatientbasicPage implements OnInit {

  mode: any;
  titleMode: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    this.titleMode = this.mode.charAt(0).toUpperCase() + this.mode.slice(1);
  }

  ngOnInit() {
  }

}
