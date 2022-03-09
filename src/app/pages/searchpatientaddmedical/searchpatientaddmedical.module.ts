import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SearchpatientaddmedicalPageRoutingModule } from './searchpatientaddmedical-routing.module';
import { SearchpatientaddmedicalPage } from './searchpatientaddmedical.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchpatientaddmedicalPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SearchpatientaddmedicalPage]
})
export class SearchpatientaddmedicalPageModule {}
