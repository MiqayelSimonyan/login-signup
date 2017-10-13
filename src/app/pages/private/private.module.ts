import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { PrivateRoutingModule } from './private.routing.module';
import { UserComponent } from './user/user.component';

@NgModule({
	imports: [
		CommonModule,
		ToasterModule,
		PrivateRoutingModule
	],
	declarations: [
		UserComponent
	],
	providers: [ToasterService],
	exports: [
		UserComponent
	]
})

export class PrivateModule { }