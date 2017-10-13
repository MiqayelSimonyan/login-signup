import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

import { AuthService } from '../auth.service';
import Auth from '../../auth';

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		if ((state.url !== '/login' && state.url !== '/signUp') && !Auth.isAuthenticated('username')) {
	    	this.authService.signOut();
		    return false;
	    }
    	return true;
	}
}