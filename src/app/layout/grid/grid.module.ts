import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        GridRoutingModule,
        PageHeaderModule,
        MatCardModule,
    ],
    declarations: [GridComponent]
})
export class GridModule { }
