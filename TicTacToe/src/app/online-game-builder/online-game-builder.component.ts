import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {GameBuilderService} from "../service/game-builder.service";

@Component({
  selector: 'app-online-game-builder',
  templateUrl: './online-game-builder.component.html',
  styleUrls: ['./online-game-builder.component.css']
})
export class OnlineGameBuilderComponent {
  public gameSize: number;
  public gameDifficulty: number;
  public gameOnlineOpponents: number;
  public gameAIOpponents: number;

  // HTML STATUSES
  public startNewGame: boolean = false;

  constructor(
    private _router: Router,
    public gameBuilderService: GameBuilderService
  ) {
    // RANDOM GAME PROPERTIES SHOWN IN HTML

    this.gameSize = 10;
    this.gameDifficulty = 6;
    this.gameOnlineOpponents = 3;
    this.gameAIOpponents = 3;
  }

  ngOnInit(): void {

  }

  public joinGameClicked() {
    // JOINING GAME LOGIC
  }

  public newGameClicked() {
    this.startNewGame = true;
  }

  public startNewGameClicked() {

    const players: any = [];

    for (let i = 0; i < this.gameAIOpponents; i++) {
      players.push({
        playerType: "AI"
      });
    }

    for (let i = 0; i < this.gameOnlineOpponents + 1; i++) {
      players.push({
        playerType: "ONLINE"
      });
    }

    this.gameBuilderService
      .buildGame(
        this.gameSize,
        this.gameDifficulty,
        players
      )
      .subscribe(() => {
        const newGameDto = {
          gameSize: this.gameSize
        };
        this._router.navigate(['lobby'], {state: newGameDto});
      });
  }

  // ----------------- GAME SIZE -----------------------

  public incrementGameSize() {
    this.gameSize++;
  }

  public decrementGameSize() {
    if (this.gameSize > 3) {
      this.gameSize--;
    }
  }

  // ----------------- GAME DIFFICULTY -----------------------

  public incrementGameDifficulty() {
    this.gameDifficulty++;
  }

  public decrementGameDifficulty() {
    if (this.gameDifficulty > 3) {
      this.gameDifficulty--;
    }
  }

  // ----------------- LOCAL OPPONENTS COUNT -----------------------

  public incrementOnlineOpponentsCount() {
    this.gameOnlineOpponents++;
  }

  public decrementOnlineOpponentsCount() {
    if (this.gameOnlineOpponents > 1) {
      this.gameOnlineOpponents--;
    }
  }

  // ----------------- AI OPPONENTS COUNT -----------------------

  public incrementAIOpponentsCount() {
    this.gameAIOpponents++;
  }

  public decrementAIOpponentsCount() {
    if (this.gameAIOpponents > 2) {
      this.gameAIOpponents--;
    }
  }
}
