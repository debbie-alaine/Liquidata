import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

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
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
