import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyHomeComponent} from './company-home.component';

const routes: Routes = [
    { path: '', component: CompanyHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CompanyHomeRoutingModule { }
