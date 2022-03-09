import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.page.html',
  styleUrls: ['./tabnav.page.scss'],
})
export class TabnavPage implements OnInit {

  parent: any;
  pid: any;
  mid: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log('tabnav.ts');
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.parent = this.router.getCurrentNavigation().extras.state.parent;
        this.pid = this.router.getCurrentNavigation().extras.state.pid;
        this.mid = this.router.getCurrentNavigation().extras.state.mid;
      }
      console.log(`tabnav, parent: ${this.parent}, pid: ${this.pid}, mid: ${this.mid}`);

    });
  }

  ngOnInit() {
  }

  clickBasicTab() {
    let navigationExtras: NavigationExtras = {
      state: {
        parent: this.parent,
        pid: this.pid,
        mid: this.mid
      }
    };
    this.router.navigate(['tabnav/tabs/viewpatientbasic'], navigationExtras);
  }

  clickMedicalTab() {
    let navigationExtras: NavigationExtras = {
      state: {
        parent: this.parent,
        pid: this.pid,
        mid: this.mid
      }
    };
    this.router.navigate(['tabnav/tabs/viewpatientmedical'], navigationExtras);
  }
}
