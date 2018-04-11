import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TimelineComponent } from './components';
import { HeaderModule } from '../shared/components/header/header.module';
import { LoadingModule } from '../shared/components/loading/loading.module';
import {SharedPipesModule} from '../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        HeaderModule,
        LoadingModule,
        SharedPipesModule
    ],
    declarations: [DashboardComponent, TimelineComponent]
})
export class DashboardModule {
    constructor() { }
}
