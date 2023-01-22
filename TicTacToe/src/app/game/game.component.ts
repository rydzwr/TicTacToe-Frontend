import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserAuthService} from '../service/user-auth.service';
import {WebSocketClient} from '../service/WebSocketApi';
import {LoadGameDto} from "../model/LoadGameDto";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  private wsClient = new WebSocketClient(
    'ws://localhost:8080/game?token=' + this._auth.accessToken
  );

  public gameSizeArray: any[] = [];
  public gameState: string;
  public currentPlayerMove: string;

  public finishedGame: boolean;
  public winnerPawn: string;

  private gameSize: number;

  constructor(
    private _auth: UserAuthService,
    private router: Router
  ) {
    const gameState = this.router.getCurrentNavigation()?.extras.state as LoadGameDto;

    if (!gameState) {
      throw new Error('No gameState route data!');
    }

    this.gameSize = gameState.gameSize;
    this.gameSizeArray = Array.from(Array(this.gameSize).keys());
    this.gameState = gameState.gameState ?? '-'.repeat(this.gameSize ** 2);

    this.currentPlayerMove = gameState.currentPlayerMove ?? '';
    this.finishedGame = false;
    this.winnerPawn = '';
  }

  async ngOnInit() {
    await this.wsClient.connect();

    this.wsClient.topic$('/topic/gameBoard').subscribe((m: any) => {
      this.gameState = m.gameState;
      this.currentPlayerMove = m.currentPlayerMove;
    });


    this.wsClient.topic$('/topic/gameState').subscribe((m: any) => {
      if (m.gameState === 'FINISHED') {
        this.finishedGame = true;
        this.winnerPawn = m.winnerPawn;
      }
    });
  }

  public cellClicked(row: number, column: number) {
    const body = {
      gameBoardElementIndex: (
        row * this.gameSizeArray.length +
        column
      ).toString(),
    };

    this.wsClient.send('/app/gameMove', body);
  }
}
