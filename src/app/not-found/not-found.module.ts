import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import {HeaderModule} from '../shared/components/header/header.module';
import {LoadingModule} from '../shared/components/loading/loading.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        NotFoundRoutingModule,
        RouterModule,
        HeaderModule,
        LoadingModule,
        CommonModule
    ],
    declarations: [NotFoundComponent]
})
export class NotFoundModule {}
