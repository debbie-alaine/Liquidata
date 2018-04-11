import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import {HeaderModule} from '../shared/components/header/header.module';
import { LoadingModule } from '../shared/components/loading/loading.module';
import {SharedPipesModule} from '../shared';

@NgModule({
  imports: [
    CommonModule,
    HistoryRoutingModule,
      HeaderModule,
      LoadingModule,
      SharedPipesModule
  ],
  declarations: [
      HistoryComponent
  ]
})
export class HistoryModule { }
