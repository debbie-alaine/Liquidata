import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatahubComponent } from './datahub.component';

const routes: Routes = [
    { path: '', component: DatahubComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatahubRoutingModule { }
