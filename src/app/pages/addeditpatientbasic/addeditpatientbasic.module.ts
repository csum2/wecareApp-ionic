import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddeditpatientbasicPageRoutingModule } from './addeditpatientbasic-routing.module';
import { AddeditpatientbasicPage } from './addeditpatientbasic.page';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddeditpatientbasicPageRoutingModule
  ],
  declarations: [AddeditpatientbasicPage]
})
export class AddeditpatientbasicPageModule {}
