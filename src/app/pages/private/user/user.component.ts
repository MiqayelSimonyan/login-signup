import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import Auth from '../../../common/auth';
import { UserService } from '../../../common/services/user.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch'

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
	public username: string;
	constructor(private route: ActivatedRoute, private userService: UserService, private toasterService: ToasterService) { }

	ngOnInit() {
		this.userData();
		this.route.data.subscribe((data: {[key: string]: any}) => {
			if (data.username) this.username = data.username;
    	});
	}

	public userData() {
		if (Auth.isAuthenticated('username')) return this.username = Auth.getToken('username');
		this.userService.userData({})
			.toPromise()
	  		.then(result => {
	  			if(!result.success) throw new Error(result.message);
	  			if (result.data.username) this.username = result.data.username;
	  			this.toasterService.pop('success', result.message);
	  			Auth.authenticate('username', result.data.username);
        	})
	  		.catch(err => {
	  			this.toasterService.pop('error', err.json().message);
	  			throw new Error(err);
	  		});
  	}
}