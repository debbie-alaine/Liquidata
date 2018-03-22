import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { SearchResultsRoutingModule } from './search-results.routing.module';
import { HeaderModule } from '../shared/components/header/header.module';
import {LoadingModule} from '../shared/components/loading/loading.module';
import {SearchResultsComponent} from './search-results.component';

@NgModule({
    imports: [
        CommonModule,
        NgbAlertModule.forRoot(),
        HeaderModule,
        LoadingModule,
        SearchResultsRoutingModule
    ],
    declarations: [
        SearchResultsComponent
    ]
})
export class SearchResultsModule { }
