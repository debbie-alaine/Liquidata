import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountComponent } from './discount.component';
import {HeaderModule} from '../shared/components/header/header.module';
import { LoadingModule } from '../shared/components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    DiscountRoutingModule,
      HeaderModule,
      LoadingModule
  ],
  declarations: [
      DiscountComponent
  ]
})
export class DiscountModule { }
