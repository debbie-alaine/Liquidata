import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyHeaderComponent } from './company-header.component';
import { MaterialModule} from '../';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [CompanyHeaderComponent],
    exports: [CompanyHeaderComponent]
})
export class CompanyHeaderModule { }
