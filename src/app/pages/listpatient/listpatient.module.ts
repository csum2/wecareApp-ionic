import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ListpatientPageRoutingModule } from './listpatient-routing.module';
import { ListpatientPage } from './listpatient.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListpatientPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListpatientPage]
})
export class ListpatientPageModule {}
