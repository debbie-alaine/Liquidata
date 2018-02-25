import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TimelineComponent } from './components';
import {HeaderModule} from '../shared/components/header/header.module';
import { LoadingModule } from '../shared/components/loading/loading.module';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        HeaderModule,
        LoadingModule
    ],
    declarations: [DashboardComponent, TimelineComponent, TimeAgoPipe]
})
export class DashboardModule {
    constructor() { }
}
