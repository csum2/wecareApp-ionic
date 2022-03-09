import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewpatientbasic',
  templateUrl: './viewpatientbasic.page.html',
  styleUrls: ['./viewpatientbasic.page.scss'],
})
export class ViewpatientbasicPage implements OnInit {

  parent: any;
  pid: any;
  mid: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log('view patient basic ');
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.parent = this.router.getCurrentNavigation().extras.state.parent;
        this.pid = this.router.getCurrentNavigation().extras.state.pid;
        this.mid = this.router.getCurrentNavigation().extras.state.mid;
      }
      console.log(`view patient basic, parent: ${this.parent}, pid: ${this.pid}, mid: ${this.mid}`);
    });
  }

  ngOnInit() {
  }

  goEdit() {
    console.log('addeditpatientbasic, goEdit()');
    this.router.navigate([`/addeditpatientbasic/edit/${this.pid}`]);
  }
}
