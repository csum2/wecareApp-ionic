import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewpatientmedicalPageRoutingModule } from './viewpatientmedical-routing.module';

import { ViewpatientmedicalPage } from './viewpatientmedical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewpatientmedicalPageRoutingModule
  ],
  declarations: [ViewpatientmedicalPage]
})
export class ViewpatientmedicalPageModule {}
