import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from '../shared/components/loading/loading.module';
import {CompanyHomeComponent} from './company-home.component';
import {CompanyHeaderModule} from '../shared/company-header/company-header.module';
import {CompanyHomeRoutingModule} from './company-home-routing.module';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        CompanyHomeRoutingModule,
        CompanyHeaderModule,
        LoadingModule
    ],
    declarations: [
        CompanyHomeComponent
    ]
})
export class CompanyHomeModule { }
