import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
    {
       path: '', redirectTo: 'dashboard', pathMatch: 'full'
    },
    {
        path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
    },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'discounts', loadChildren: './discount/discount.module#DiscountModule' },
    { path: 'datahub', loadChildren: './datahub/datahub.module#DatahubModule' },
    { path: 'history', loadChildren: './history/history.module#HistoryModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: 'profile', loadChildren: './profile-page/profile.module#ProfilePageModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
