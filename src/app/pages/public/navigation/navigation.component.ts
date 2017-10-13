import { Component } from '@angular/core';
import { AuthService } from '../../../common/services/auth.service';
import Auth from '../../../common/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
	constructor(private authService: AuthService) { }

	public isAuth() {
  		return Auth.isAuthenticated('username');
	}

	public logOut() {
		this.authService.signOut();
		Auth.deAuthenticate('username');
  	}
}
