import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthData } from '../models/auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: Http, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string, email: string, password: string, role: string) {
    const authData: AuthData = {name: name, email: email, password: password, role: role };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/user/signup', authData,  { headers: headers })
    .pipe(map(res => res.json()));
  }

  // login(email: string, password: string) {
  //   const authData: AuthData = { email: email, password: password };
  //   this.http
  //     .post<{ token: string; expiresIn: number }>(
  //       'http://localhost:3000/api/user/login',
  //       authData
  //     )
  //     .subscribe(response => {
  //       const token = response.token;
  //       this.token = token;
  //       if (token) {
  //         const expiresInDuration = response.expiresIn;
  //         this.setAuthTimer(expiresInDuration);
  //         this.isAuthenticated = true;
  //         this.authStatusListener.next(true);
  //         const now = new Date();
  //         const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
  //         console.log(expirationDate);
  //         this.saveAuthData(token, expirationDate);
  //         this.router.navigate(['/']);
  //       }
  //     });
  // }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/user/login', authData, { headers: headers })
    .pipe(
      map(res => res.json()
      )
    );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // private saveAuthData(token: string, expirationDate: Date) {
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('expiration', expirationDate.toISOString());
  // }

  saveAuthData(token, user, expiresIn) {
      const expiresInDuration = expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      userInfo: user,
      expirationDate: new Date(expirationDate)
    };
  }
}
