import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewpatientbasicPageRoutingModule } from './viewpatientbasic-routing.module';

import { ViewpatientbasicPage } from './viewpatientbasic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewpatientbasicPageRoutingModule
  ],
  declarations: [ViewpatientbasicPage]
})
export class ViewpatientbasicPageModule {}
