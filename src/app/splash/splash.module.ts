import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplashRoutingModule } from './splash-routing.module';
import { SplashComponent } from './splash.component';
import {HeaderComponent} from '../shared/components';

@NgModule({
    imports: [
        CommonModule,
        SplashRoutingModule
    ],
    declarations: [SplashComponent]
})
export class SplashModule { }

