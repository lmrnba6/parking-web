import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    });

  constructor(private http: HttpClient) {
  }

  login(usernameOrEmail: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/signin`, {usernameOrEmail, password}, {headers: this.headers})
      .pipe(map(user => {
        if (user && user.accessToken) {
          this.setToken(user);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('AUTH_TOKEN');
  }

  getToken(): string {
    return localStorage.getItem('AUTH_TOKEN');
  }

  setToken(user: any): void {
    localStorage.setItem('AUTH_TOKEN', JSON.stringify(user));
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
}
