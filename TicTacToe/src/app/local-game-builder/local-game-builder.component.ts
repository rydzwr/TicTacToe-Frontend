import { Component } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {GameBuilderService} from "../service/game-builder.service";

@Component({
  selector: 'app-local-game-builder',
  templateUrl: './local-game-builder.component.html',
  styleUrls: ['./local-game-builder.component.css']
})
export class LocalGameBuilderComponent {
  public gameSize: number;
  public gameDifficulty: number;
  public gameLocalOpponents: number;
  public gameAIOpponents: number;

  // HTML STATUSES
  public startNewGame: boolean = false;

  constructor(
    public userService: UserService,
    private _router: Router,
    public gameBuilderService: GameBuilderService
  ) {
    // RANDOM GAME PROPERTIES SHOWN IN HTML

    this.gameSize = 10;
    this.gameDifficulty = 6;
    this.gameLocalOpponents = 3;
    this.gameAIOpponents = 3;
  }

  ngOnInit(): void {
    this.userService.canResumeGame();
  }

  public newGameClicked() {
    this.startNewGame = true;
  }

  public continueGameClicked() {
    this.gameBuilderService.continueGame().subscribe((res) => {
      console.log("Continue game returned:");
      console.log(res);
      this._router.navigate(['play'], {state: res});
    });
  }

  public startNewGameClicked() {

    const players: any = [];

    for (let i = 0; i < this.gameAIOpponents; i++) {
      players.push({
        playerType: "AI"
      });
    }

    for (let i = 0; i < this.gameLocalOpponents; i++) {
      players.push({
        playerType: "LOCAL"
      });
    }

    this.gameBuilderService
      .buildGame(
        this.gameSize,
        this.gameDifficulty,
        players
      )
      .subscribe((gameData) => {
        console.log("GF");
        console.log(gameData);
        this._router.navigate(['play'], {state: gameData });
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

  public incrementLocalOpponentsCount() {
    this.gameLocalOpponents++;
  }

  public decrementLocalOpponentsCount() {
    if (this.gameLocalOpponents > 0) {
      this.gameLocalOpponents--;
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
