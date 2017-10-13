import { AbstractControl } from '@angular/forms';
import { appSettings } from '../../app.settings';

export class EmailValidator {
	public static validate(control: AbstractControl) {
		return (control.value != '' && !appSettings.EMAIL_REGEXP.test(control.value)) ? {
			validateEmail: {
				valid: false
			}
		}: null
	}
}