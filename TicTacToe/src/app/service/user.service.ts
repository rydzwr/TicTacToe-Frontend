import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isUserInGameSubject: BehaviorSubject<boolean>;

  public get userInGame$(): Observable<boolean> {
    return this.isUserInGameSubject.asObservable();
}

  constructor(private http: HttpClient,
    public auth: UserAuthService,
    @Inject('SERVER_URL') private url: String
  ) {
    this.isUserInGameSubject = new BehaviorSubject(false);
  }

  public canResumeGame() {
    this.http
      .get<boolean>(`${this.url}/api/game/canResumeGame`, {
        withCredentials: true,
        headers: this.auth.authHeader,
      }).subscribe((inGame) => { this.isUserInGameSubject.next(inGame); console.log(inGame) });
  }
}
