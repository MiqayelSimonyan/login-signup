import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { PublicRoutingModule } from './public.routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';

@NgModule({
	imports: [
		CommonModule,
		PublicRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		ToasterModule
	],
	declarations: [
		NavigationComponent,
		SignUpComponent,
		LoginComponent,
		NotFoundComponent
	],
	providers: [ToasterService],
	exports: [
		NavigationComponent,
		SignUpComponent,
		LoginComponent,
		NotFoundComponent
	]
})

export class PublicModule { }