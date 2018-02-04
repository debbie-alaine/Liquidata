import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import {HeaderModule} from '../shared/components/header/header.module';

@NgModule({
    imports: [
        NotFoundRoutingModule,
        RouterModule,
        HeaderModule
    ],
    declarations: [NotFoundComponent]
})
export class NotFoundModule {}
