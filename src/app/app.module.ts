import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { HeaderComponent } from './shared/index';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        NgbDropdownModule.forRoot()
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})

export class AppModule {
}
