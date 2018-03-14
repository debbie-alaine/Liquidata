import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { CompanyDetailRoutingModule } from './company-detail-routing.module';
import { HeaderModule } from '../shared/components/header/header.module';
import {LoadingModule} from '../shared/components/loading/loading.module';
import {CompanyDetailComponent} from './company-detail.component';

@NgModule({
    imports: [
        CommonModule,
        NgbAlertModule.forRoot(),
        CompanyDetailComponent,
        HeaderModule,
        LoadingModule
    ],
    declarations: [
        CompanyDetailComponent
    ]
})
export class CompanyDetailPageModule { }
