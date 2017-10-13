import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { LoginComponent } from './pages/public/login/login.component';
import { SignUpComponent } from './pages/public/sign-up/sign-up.component';
import { NotFoundComponent } from './pages/public/not-found/not-found.component';

const appRoutes: Routes = [
	{path: '', loadChildren: 'app/pages/pages.module#PagesModule'},
	{path: 'not-found', component: NotFoundComponent},
	{path: '**', redirectTo: '/not-found'}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule {  }