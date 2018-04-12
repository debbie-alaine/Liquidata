import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {CompanyHomeComponent} from './company-home/company-home.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
    { path: 'splash', loadChildren: './splash/splash.module#SplashModule'},
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
    { path: 'discounts', loadChildren: './discount/discount.module#DiscountModule', canActivate: [AuthGuard] },
    { path: 'datahub', loadChildren: './datahub/datahub.module#DatahubModule', canActivate: [AuthGuard] },
    { path: 'history', loadChildren: './history/history.module#HistoryModule', canActivate: [AuthGuard] },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: 'company-detail/:id', component: CompanyDetailComponent, canActivate: [AuthGuard]},
    { path: 'user-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
    { path: 'search', loadChildren: './search-results/search-results.module#SearchResultsModule', canActivate: [AuthGuard] },
    { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
    { path: 'company', loadChildren: './company-home/company-home.module#CompanyHomeModule' },
    { path: 'request', loadChildren: './company-request/company-request.module#CompanyRequestModule' },
    { path: 'company-dashboard', loadChildren: './company-dashboard/company-dashboard.module#CompanyDashboardModule'},
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
