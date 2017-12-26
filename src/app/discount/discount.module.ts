import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountComponent } from './discount.component';

@NgModule({
  imports: [
    CommonModule,
    DiscountRoutingModule
  ],
  declarations: [DiscountComponent]
})
export class DiscountModule { }
