import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {GameBuilderService} from '../service/game-builder.service';
import {UserService} from '../service/user.service';
import {PlayerDto} from "../model/PlayerDto";

@Component({
  selector: 'app-game-builder',
  templateUrl: './game-builder.component.html',
  styleUrls: ['./game-builder.component.scss'],
})
export class GameBuilderComponent {
  public gameSize: number;
  public gameDifficulty: number;
  public gameLocalOpponents: number;
  public gameAIOpponents: number;
  public gameOnlineOpponents: number;

  // HTML STATUSES
  public startNewGame: boolean = false;

  public onlineGameTypeChoose: boolean = false;
  public localGameTypeChoose: boolean = false;

  public localGameType: boolean = false;
  public onlineGameType: boolean = false;

  public readyPlayersArray: any = [];

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
    this.gameOnlineOpponents = 3;
  }

  ngOnInit(): void {
    this.userService.canResumeGame();
  }

  // CHECKING IF PLAYER CAN RESUME GAME

  public continueGameClicked() {
    this.gameBuilderService.continueGame().subscribe((res) => {
      console.log("Continue game returned:");
      console.log(res);
      this._router.navigate(['game'], {state: res});
    });
  }

  // BUILDING REQUEST FOR NEW LOCAL GAME

  public startNewLocalGameClicked() {

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
      .subscribe(() => {
        const newGameDto = {
          gameSize: this.gameSize
        };
        this._router.navigate(['game'], {state: newGameDto});
      });
  }

  // JOINING ONLINE GAME

  public joinOnlineGameClicked() {

  }

  public createNewOnlineGameClicked() {

  }

  // BUILDING REQUEST FOR NEW ONLINE GAME

  public startNewOnlineGameClicked() {
    const players: any = [];

    for (let i = 0; i < this.gameAIOpponents; i++) {
      players.push({
        playerType: "ONLINE"
      });
    }

    this.gameBuilderService.buildGame(this.gameSize, this.gameDifficulty, players).subscribe(() => {
      this._router.navigate(['lobby']);
    });
  }

  public newGameClicked() {
    this.startNewGame = true;
  }

  public singlePlayerClicked() {
    this._router.navigate(['local-game-builder']);
  }

  public onlinePlayersClicked() {
    this._router.navigate(['online-game-builder']);
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

  // ----------------- PLAYER DIFFICULTY -----------------------

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
    if (this.gameLocalOpponents > 1) {
      this.gameLocalOpponents--;
    }
  }

  // ----------------- ONLINE OPPONENTS COUNT -----------------------

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

