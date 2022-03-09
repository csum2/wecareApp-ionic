import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListpatientPage } from './listpatient.page';

const routes: Routes = [
  {
    path: '',
    component: ListpatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListpatientPageRoutingModule {}
