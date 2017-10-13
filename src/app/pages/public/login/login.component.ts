import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import Auth from '../../../common/auth';
import { AuthService } from '../../../common/services/auth.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public loginForm: FormGroup;
	public submitted: boolean = false;

	constructor(private fb: FormBuilder, private router: Router,
  		private route: ActivatedRoute, private authService: AuthService, private toasterService: ToasterService) { }

	ngOnInit() {
		this.setForm();
	}

	public setForm() {
		this.loginForm = this.fb.group({
	  		username: ['', [Validators.required, Validators.maxLength(125)]],
	  		password: ['', [Validators.required]],
	  	})
	}

  	public login(value) {
  		this.submitted = true;
  		if (this.loginForm.valid) {
  			this.authService.signIn({
	  				username: value.username,
	  				password: value.password
	  			})
  				.toPromise()
		  		.then(result => {
		  			if (!result.success) throw new Error(result.message);
		  			Auth.authenticate('username', result.data.username);
		  			this.toasterService.pop('success', result.message);
	  				this.router.navigate(['/user']);
	        	})
		  		.catch(err => {
		  			this.toasterService.pop('error', err.json().message);
		  			throw new Error(err);
		  		});
  		}
  	}

}
