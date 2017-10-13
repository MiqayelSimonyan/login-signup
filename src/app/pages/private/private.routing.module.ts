import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { UserComponent } from './user/user.component';
import { AuthGuardService } from '../../common/services/guardService/auth.guard.service';

const routes: Routes = [
	{path: 'user', canActivate: [AuthGuardService], component: UserComponent}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		ToasterModule
	],
	providers: [ToasterService],
	exports: [RouterModule]
})

export class PrivateRoutingModule {  }