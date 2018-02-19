import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {HeaderModule} from '../shared/components/header/header.module';
import { LoadingModule } from '../shared/components/loading/loading.module';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        ProfileRoutingModule,
        HeaderModule,
        LoadingModule
    ],
    declarations: [
        ProfileComponent
    ]
})
export class ProfileModule { }
