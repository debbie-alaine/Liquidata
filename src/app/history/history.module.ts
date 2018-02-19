import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import {HeaderModule} from '../shared/components/header/header.module';
import { LoadingModule } from '../shared/components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    HistoryRoutingModule,
      HeaderModule,
      LoadingModule
  ],
  declarations: [
      HistoryComponent
  ]
})
export class HistoryModule { }
