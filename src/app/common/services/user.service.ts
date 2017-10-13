import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { IResponse } from '../interfaces/response.interface';
import { API_URLS } from '../api.urls';

@Injectable()
export class UserService {
  public headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  public userData(data): Observable<IResponse<any>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
  	return this.http.post(API_URLS.apiUserDataUrl, data, this.headers)
                    .map((response: Response) => response.json());
  }
}