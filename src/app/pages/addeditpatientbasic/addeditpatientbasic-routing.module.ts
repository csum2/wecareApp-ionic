import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddeditpatientbasicPage } from './addeditpatientbasic.page';

const routes: Routes = [
  {
    path: '',
    component: AddeditpatientbasicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddeditpatientbasicPageRoutingModule {}
