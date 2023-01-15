import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, catchError, interval, Observable, throwError } from 'rxjs';
import { UserAuth } from '../model/UserAuth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserDto } from '../model/UserDto';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements CanActivate {
  private _loggedInSubject : BehaviorSubject<boolean>;
  private _username;
  private _accessToken;

  private _refreshInterval = interval(400000);

  public get username() {
    return this._username;
  }

  public get loggedIn() {
    return this._loggedInSubject.getValue();
  }

  public get accessToken() {
    return this._accessToken;
  }

  public get loggedIn$(): Observable<boolean> {
    return this._loggedInSubject.asObservable();
  }

  public get authHeader(): HttpHeaders {
    return new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: 'Bearer ' + this._accessToken,
    });
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('SERVER_URL') private url: String
  ) {
    const loggedIn = sessionStorage.getItem('loggedIn') === "true";
    this._username = sessionStorage.getItem('username') ?? '';
    this._accessToken = sessionStorage.getItem('access_token') ?? '';
    this._refreshInterval.subscribe((val) => this.refreshToken());
    this._loggedInSubject = new BehaviorSubject(loggedIn);
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.loggedIn) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  public login(name: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let body = new URLSearchParams();
      body.set('username', name);
      body.set('password', password);

      this.http
        .post<UserAuth>(`${this.url}/api/login`, body.toString(), {
          withCredentials: true,
          headers: new HttpHeaders({
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(`${name}:${password}`),
          }),
        })
        .pipe(
          catchError((err) => {
            const httpErr = err as HttpErrorResponse;
            if (httpErr.status === 0) {
              console.log('Network error occured!');
              reject();
            } else if (httpErr.status === 401) {
              console.log('Invalid credentials!');
              resolve(false);
            } else {
              reject();
            }
            return throwError(() => new Error());
          })
        )
        .subscribe((res) => {
          console.log(res.role);
          console.log(res.access_token);
          this._username = name;
          this._loggedInSubject.next(true);
          this._accessToken = res.access_token;
          sessionStorage.setItem('username', this._username);
          sessionStorage.setItem('loggedIn', this.loggedIn ? 'true' : 'false');
          sessionStorage.setItem('access_token', this._accessToken);
          resolve(true);
        });
    });
  }

  public register(name: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const body: UserDto = { name: name, password: password };

      console.log(body.name + ' ' + body.password);

      this.http
        .post(`${this.url}/api/user/register`, body)
        .pipe(
          catchError((err) => {
            const httpErr = err as HttpErrorResponse;
            if (httpErr.status === 0) {
              console.log('Network error occured!');
              reject();
            } else if (httpErr.status === 401) {
              console.log('Invalid credentials!');
              resolve(false);
            } else {
              reject();
            }
            return throwError(() => new Error());
          })
        )
        .subscribe(() => {
          resolve(true);
        });
    });
  }

  public logout() {
    this.http
      .get(`${this.url}/api/logout`, {
        withCredentials: true,
        headers: this.authHeader,
      })
      .subscribe((res) => {
        this._username = '';
        this._loggedInSubject.next(false);
        this._accessToken = '';
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('access_token');
      });
  }

  public refreshToken() {
    this.http
      .get<UserAuth>(`${this.url}/api/token/refresh`, {
        withCredentials: true,
        headers: this.authHeader,
      })
      .subscribe((res) => {
        this._accessToken = res.access_token;
        sessionStorage.setItem('access_token', this._accessToken);
      });
  }
}