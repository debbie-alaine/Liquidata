import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDashboardComponent } from './company-dashboard.component';
import {CompanyHeaderModule} from '../shared/company-header/company-header.module';
import {CompanyDashboardRoutingModule} from './company-dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
      CompanyHeaderModule,
      CompanyDashboardRoutingModule
  ],
  declarations: [CompanyDashboardComponent]
})
export class CompanyDashboardModule { }
