import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchpatientaddmedicalPage } from './searchpatientaddmedical.page';

const routes: Routes = [
  {
    path: '',
    component: SearchpatientaddmedicalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchpatientaddmedicalPageRoutingModule {}
