import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages.routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
	imports: [
		CommonModule,
		PagesRoutingModule
	],
	declarations: [
		PagesComponent
	],
	providers: [],
	exports: [PagesComponent]
})

export class PagesModule { }