class ApiUrls {
	constructor() {}

	public get apiSigninUrl() {
		return '/auth/signin';
	}

	public get apiSignUpUrl() {
		return '/auth/signup';
	}

	public get apiSignOutUrl() {
		return '/auth/signup';
	}

	public get apiUserDataUrl() {
		return '/auth/signout';
	}

}

export const API_URLS = new ApiUrls();