import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavPage } from './tabnav.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabnavPage,
    children: [
      {
        path: 'viewpatientbasic',
        loadChildren: () => import('../viewpatientbasic/viewpatientbasic.module').then( m => m.ViewpatientbasicPageModule)
      },
      {
        path: 'viewpatientmedical',
        loadChildren: () => import('../viewpatientmedical/viewpatientmedical.module').then( m => m.ViewpatientmedicalPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/viewpatientbasic',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/viewpatientbasic',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavPageRoutingModule {}
