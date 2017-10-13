import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import Auth from '../../../common/auth';
import { EmailValidator } from '../../../common/validators/email.validator';
import { AuthService } from '../../../common/services/auth.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
	public signUpForm: FormGroup;
	public submitted: boolean = false;

  	constructor(private fb: FormBuilder, private router: Router,
  		private route: ActivatedRoute, private authService: AuthService, private toasterService: ToasterService) { }

	ngOnInit() {
		this.setForm();
	}

	public setForm() {
		this.signUpForm = this.fb.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, EmailValidator.validate]],
	  		username: ['', [Validators.required, Validators.maxLength(125)]],
	  		password: ['', [Validators.required]],
	  	})
	}

  	public signUp(value) {
  		this.submitted = true;  		
  		if (this.signUpForm.valid) {
  			this.authService.signUp({
	  				name: value.name,
	  				username: value.username,
	  				email: value.email,
	  				password: value.password
	  			})
  				.toPromise()
		  		.then(result => {
		  			if(!result.success) throw new Error(result.message);
		  			Auth.authenticate('username', result.data.username);
		  			this.toasterService.pop('success', result.message);
		  			setTimeout(() => this.router.navigate(['/user']), 500);
	        	})
		  		.catch(err => {
		  			this.toasterService.pop('error', err.json().message);
		  			throw new Error(err);
		  		});
  		}
  	}

}
