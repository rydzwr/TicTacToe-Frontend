import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {LoadGameDto} from '../model/LoadGameDto';
import {UserAuthService} from './user-auth.service';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameBuilderService {
  constructor(private http: HttpClient,
              private auth: UserAuthService,
              @Inject('SERVER_URL') private url: String) {
  }

  public buildGame(gameSize: number, gameDifficulty: number, gameOpponents: [] ): Observable<LoadGameDto> {

    const body: any = {
      gameSize: gameSize,
      gameDifficulty: gameDifficulty,
      players: gameOpponents
    }

    console.log("BUILDING GAME WITH DATA: --> ");
    console.log("GAME SIZE: --> " + body.gameSize);
    console.log("GAME DIFFICULTY: --> " + body.gameDifficulty);
    console.log("GAME DTO: --> ");
    console.log(body)

    return this.http.post<LoadGameDto>(`${this.url}/api/game/createGame`, body, {
      withCredentials: true,
      headers: this.auth.authHeader,
    });
  }

  public continueGame(): Observable<LoadGameDto> {
    console.log("GAME BUILDER --> CONTINUE GAME");
    return this.http.get<LoadGameDto>(`${this.url}/api/game/continueGame`, {
      withCredentials: true,
      headers: this.auth.authHeader,
    });
  }

  public getInviteCode() {
    return this.http.get<string>(`${this.url}/api/game/inviteCode`, {
      withCredentials: true,
      headers: this.auth.authHeader,
    });
  }

  public getEmptyGameSlots() {
    return this.http.get<number>(`${this.url}/api/game/emptyGameSlots`, {
      withCredentials: true,
      headers: this.auth.authHeader,
    });
  }

  public joinOnlineGame(inviteCode: string): Observable<LoadGameDto> {
    const body: any = {
      inviteCode: inviteCode,
    }

    return this.http.post<LoadGameDto>(`${this.url}/api/game/joinGame`, body, {
      withCredentials: true,
      headers: this.auth.authHeader,
    });
  }
}
