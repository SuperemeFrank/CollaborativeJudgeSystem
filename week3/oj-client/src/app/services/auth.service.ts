// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { Http, Response, Headers} from '@angular/http';
import { RequestOptions } from "@angular/http";

(window as any).global = window;

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'tVCyhEeI5TDWfbIAw_oVi7Vfz5fDg7e6',
    domain: 'frankyu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://frankyu.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000',
    scope: 'openid profile'
  });

  constructor(public router: Router, private http: Http) {}

  userProfile: any;


  public login(): void {
    this.auth0.authorize();
  }
  public handleAuthentication(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          var self =  this;
          this.setSession(authResult)
              .then(function() {
                self.userProfile = localStorage.getItem('profile');
                resolve(JSON.parse(self.userProfile));
              });
          this.router.navigate(['/']);

        } else if (err) {
          this.router.navigate(['/']);
          console.log(err);
          alert(`Error: ${err.error}. Check the console for further details.`);
          reject();
        }
      });
    });

  }

  private setSession(authResult): Promise<any> {
    return new Promise((resolve, reject) => {
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      const accessToken = localStorage.getItem('access_token');
      this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
        if (profile) {
          console.log("set profile");
          localStorage.setItem('profile', JSON.stringify(profile));
          resolve();
        }
      });
    })

  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }


  public resetPassword() {
    console.log("asdas", this.auth0.domain);
    let profile = JSON.parse(localStorage.getItem('profile'));
    let url= "https://frankyu.auth0.com/dbconnections/change_password";
    let headers = new Headers({ 'content-type': 'application/json' });
    let body = {
      client_id: 'tVCyhEeI5TDWfbIAw_oVi7Vfz5fDg7e6',
      email: profile.name,
      connection: 'Username-Password-Authentication'
    };
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post(url, body, options)
            .toPromise()
            .then((res: Response) => {
              console.log(res.json());
            })
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('Error occurred', error);
    return Promise.reject(error.message || error);
  }
}
