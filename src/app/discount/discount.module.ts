import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountComponent } from './discount.component';
import { TablesComponent } from '../layout/tables/tables.component';

@NgModule({
  imports: [
    CommonModule,
    DiscountRoutingModule
  ],
  declarations: [
      DiscountComponent,
      TablesComponent
  ]
})
export class DiscountModule { }
