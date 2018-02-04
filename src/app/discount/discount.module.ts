import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountComponent } from './discount.component';
import {HeaderModule} from '../shared/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    DiscountRoutingModule,
      HeaderModule
  ],
  declarations: [
      DiscountComponent
  ]
})
export class DiscountModule { }
