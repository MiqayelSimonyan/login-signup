import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages.component';

const routes:Routes = [
	{path: '', loadChildren: 'app/pages/public/public.module#PublicModule'},
	{path: '', loadChildren: 'app/pages/private/private.module#PrivateModule'}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class PagesRoutingModule {}