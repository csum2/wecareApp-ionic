import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'addeditpatientbasic/:mode/:pid',
    loadChildren: () => import('./pages/addeditpatientbasic/addeditpatientbasic.module').then( m => m.AddeditpatientbasicPageModule)
  },
  {
    path: 'addeditpatientmedical/:mode/:pid/:mid',
    loadChildren: () => import('./pages/addeditpatientmedical/addeditpatientmedical.module').then( m => m.AddeditpatientmedicalPageModule)
  },
  {
    path: 'listpatient/:mode',
    loadChildren: () => import('./pages/listpatient/listpatient.module').then( m => m.ListpatientPageModule)
  },
  {
    path: 'searchpatientaddmedical',
    loadChildren: () => import('./pages/searchpatientaddmedical/searchpatientaddmedical.module').then( m => m.SearchpatientaddmedicalPageModule)
  },
  {
    path: 'tabnav',
    loadChildren: () => import('./pages/tabnav/tabnav.module').then( m => m.TabnavPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
