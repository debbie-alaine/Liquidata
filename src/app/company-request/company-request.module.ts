import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRequestComponent } from './company-request.component';
import {CompanyRequestRoutingModule} from './company-request-routing.module';
import {CompanyHeaderModule} from '../shared/company-header/company-header.module';
import {MaterialModule} from '../shared/components';

@NgModule({
  imports: [
    CommonModule,
      CompanyRequestRoutingModule,
      CompanyHeaderModule,
      MaterialModule
  ],
  declarations: [CompanyRequestComponent]
})
export class CompanyRequestModule { }
