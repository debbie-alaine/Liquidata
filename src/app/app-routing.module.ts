import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';


const routes: Routes = [
    { path: '', redirectTo: 'splash', pathMatch: 'full'},
    { path: 'splash', loadChildren: './splash/splash.module#SplashModule'},
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
    { path: 'discounts', loadChildren: './discount/discount.module#DiscountModule', canActivate: [AuthGuard] },
    { path: 'datahub', loadChildren: './datahub/datahub.module#DatahubModule', canActivate: [AuthGuard] },
    { path: 'history', loadChildren: './history/history.module#HistoryModule', canActivate: [AuthGuard] },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: 'profile', loadChildren: './profile-page/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
