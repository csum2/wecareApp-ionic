import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddeditpatientmedicalPageRoutingModule } from './addeditpatientmedical-routing.module';
import { AddeditpatientmedicalPage } from './addeditpatientmedical.page';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddeditpatientmedicalPageRoutingModule
  ],
  declarations: [AddeditpatientmedicalPage]
})
export class AddeditpatientmedicalPageModule {}
