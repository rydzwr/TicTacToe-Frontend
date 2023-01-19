import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GameBuilderComponent} from '../game-builder/game-builder.component';
import {UserAuthService} from '../service/user-auth.service';
import {WebSocketClient} from '../service/WebSocketApi';
import {LoadGameDto} from "../model/LoadGameDto";
import {GameBuilderService} from "../service/game-builder.service";
import {Subscription} from "rxjs";

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

  public finishedGame: string;
  public winnerPawn: string;

  private gameSize: number;

  constructor(
    private _auth: UserAuthService,
    private router: Router,
    private gameBuilderService: GameBuilderService
  ) {
    const gameState = this.router.getCurrentNavigation()?.extras.state as LoadGameDto;

    /*if (continueGameClicked) {
      console.log("CONTINUE GAME CLICKED")
      this.gameSize = gameBuilderService.getLoadedPrevGameSubject().gameSize;
      console.log("GAME SIZE FROM PREV GAME SUBJECT: --> ", + this.gameSize)
    } else {
      this.gameSize = this.router.getCurrentNavigation()?.extras.state?.['gameSize'];
    }*/

    if (!gameState) {
      throw new Error('No gameState route data!');
    }

    this.gameSize = gameState.gameSize;
    this.gameSizeArray = Array.from(Array(this.gameSize).keys());
    this.gameState = gameState.gameState ?? '-'.repeat(this.gameSize ** 2);

    this.currentPlayerMove = gameState.currentPlayerMove ?? '';
    this.finishedGame = '';
    this.winnerPawn = '';
  }

  async ngOnInit() {
    await this.wsClient.connect();

    this.wsClient.topic$('/topic/gameBoard').subscribe((m: any) => {
      this.gameState = m.gameState;
      this.currentPlayerMove = m.currentPlayerMove;
      console.log('Current Player Move: --> ' + this.currentPlayerMove);
    });


    this.wsClient.topic$('/topic/gameState').subscribe((m: any) => {
      if (m.gameState === 'FINISHED') {
        this.finishedGame = m.gameState;
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
