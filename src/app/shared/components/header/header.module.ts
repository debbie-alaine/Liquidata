import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { MaterialModule} from '../';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})
export class HeaderModule { }
