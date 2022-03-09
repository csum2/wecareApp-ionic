import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewpatientmedicalPage } from './viewpatientmedical.page';

const routes: Routes = [
  {
    path: '',
    component: ViewpatientmedicalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewpatientmedicalPageRoutingModule {}
