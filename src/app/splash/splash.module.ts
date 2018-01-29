import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplashRoutingModule } from './splash-routing.module';
import { SplashComponent } from './splash.component';

@NgModule({
    imports: [
        CommonModule,
        SplashRoutingModule
    ],
    declarations: [SplashComponent]
})
export class SplashModule { }
