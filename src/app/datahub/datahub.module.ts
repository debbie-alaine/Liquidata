import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { DatahubRoutingModule } from './datahub-routing.module';
import { DatahubComponent } from './datahub.component';
import {HeaderModule} from '../shared/components/header/header.module';

@NgModule({
    imports: [
        CommonModule,
        NgbAlertModule.forRoot(),
        DatahubRoutingModule,
        HeaderModule
    ],
    declarations: [
        DatahubComponent
    ]
})
export class DatahubModule { }
