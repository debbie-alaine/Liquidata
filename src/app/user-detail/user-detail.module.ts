import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { UserDetailRoutingModule } from './user-detail-routing.module';
import { HeaderModule } from '../shared/components/header/header.module';
import {LoadingModule} from '../shared/components/loading/loading.module';
import {UserDetailComponent} from './user-detail.component';

@NgModule({
    imports: [
        CommonModule,
        NgbAlertModule.forRoot(),
        UserDetailRoutingModule,
        HeaderModule,
        LoadingModule
    ],
    declarations: [
        UserDetailComponent
    ]
})
export class UserDetailModule { }
