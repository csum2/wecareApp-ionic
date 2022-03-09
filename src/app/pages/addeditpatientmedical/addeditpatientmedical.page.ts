import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addeditpatientmedical',
  templateUrl: './addeditpatientmedical.page.html',
  styleUrls: ['./addeditpatientmedical.page.scss'],
})
export class AddeditpatientmedicalPage implements OnInit {

  mode: any;
  titleMode: any;
  pid: any;
  mid: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    this.titleMode = this.mode.charAt(0).toUpperCase() + this.mode.slice(1);
    this.pid = this.activatedRoute.snapshot.paramMap.get('pid');
    this.mid = this.activatedRoute.snapshot.paramMap.get('mid');
    console.log(`add edit patient medical, mode: ${this.mode}, pid: ${this.pid}, mid: ${this.mid}`);
  }

  ngOnInit() {
  }

}
