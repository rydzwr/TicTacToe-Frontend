import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {LoadGameDto} from '../model/LoadGameDto';
import {UserAuthService} from './user-auth.service';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameBuilderService {
  public loadedPrevGameSubject: BehaviorSubject<LoadGameDto>;
  private loadGameDto: LoadGameDto = {gameSize: 0, gameState: "", currentPlayerMove: ""}

  constructor(private http: HttpClient,
              private auth: UserAuthService,
              @Inject('SERVER_URL') private url: String) {

    this.loadedPrevGameSubject = new BehaviorSubject(this.loadGameDto);
  }

  public getLoadedPrevGameSubject() {
    return this.loadedPrevGameSubject.getValue();
  }

  public get loadedPrevGameSubject$(): Observable<LoadGameDto> {
    return this.loadedPrevGameSubject.asObservable();
  }

  public buildGame(gameSize: number, gameDifficulty: number, gameOpponents: number): Observable<boolean> {

    const players: any = [];
    for (let i = 0; i < gameOpponents; i++) {
      players.push({
        playerType: "LOCAL",
        playerPawn: `${i}`
      });
    }

    const body: any = {
      gameSize: gameSize,
      gameDifficulty: gameDifficulty,
      players: players
    }

    return this.http.post<boolean>(`${this.url}/api/game/createGame`, body, {
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
}
