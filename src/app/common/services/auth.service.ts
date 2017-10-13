import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { IResponse } from '../interfaces/response.interface';
import { API_URLS } from '../api.urls';

@Injectable()
export class AuthService {
  public headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  public signIn(userData): Observable<IResponse<any>> {
  	return this.http.post(API_URLS.apiSigninUrl, userData, this.headers)
                    .map((response: Response) => response.json());
  }

  public signUp(userData): Observable<IResponse<any>> {
    return this.http.post(API_URLS.apiSignUpUrl, userData, this.headers)
                    .map((response: Response) => response.json());
  }

  public signOut(): Observable<any> {
    return this.http.post(API_URLS.apiUserDataUrl, {});
  }

}