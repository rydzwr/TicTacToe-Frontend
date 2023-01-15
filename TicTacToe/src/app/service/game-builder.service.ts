import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameBuilderService {

  constructor(private http: HttpClient,
    private auth: UserAuthService,
    @Inject('SERVER_URL') private url: String) { }

  public buildGame(gameType: string, gameSize: number, gameDifficulty: number, gameOpponents: number) {
    console.log("Building Game...")

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
}
