import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt'
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {HeaderModule} from './shared/components/header/header.module';
import {LoadingModule} from './shared/components/loading/loading.module';
import { CollapseModule } from 'ngx-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DbService } from './db/db.service'
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        HeaderModule,
        LoadingModule,
        CollapseModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter() {
                    return localStorage.getItem('access_token');
                },
                whitelistedDomains: ['http://liquidatarewards.com']
            }
        }),
        AngularFireModule.initializeApp(environment.firebase, 'liquidata'),
        AngularFireDatabaseModule
],
    bootstrap: [AppComponent],
    providers: [
        AuthService,
        AuthGuardService,
        DbService
    ]
})

export class AppModule {
}
