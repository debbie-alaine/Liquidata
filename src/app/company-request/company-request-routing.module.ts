import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyRequestComponent} from './company-request.component';

const routes: Routes = [
    { path: '', component: CompanyRequestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRequestRoutingModule { }
