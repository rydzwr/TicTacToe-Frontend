import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { GameBuilderService } from '../service/game-builder.service';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-game-builder',
  templateUrl: './game-builder.component.html',
  styleUrls: ['./game-builder.component.scss']
})
export class GameBuilderComponent {

  public gameType: string;
  public gameSize: number;
  public gameDifficulty: number;
  public gameOpponents: number;

  private singlePlayerGmaeType: string = "singlePlayer";

  public startNewGame: boolean = false;
  public singlePlayerGameType: boolean = false;
  public showGameBuilderTemplate: boolean = false;

  constructor(public auth: UserAuthService, public userService: UserService, private _router: Router, private gameBuilderService: GameBuilderService) {
    this.gameType = '';
    this.gameSize = 3;
    this.gameDifficulty = 3;
    this.gameOpponents = 2;
  }

  ngOnInit(): void {
    this.userService.canResumeGame();
  }

  public newGameClicked() {
    this.startNewGame = true;
    console.log("Start New Game Clicked:" + this.startNewGame);
  }


  public singlePlayerClicked() {
    this.showGameBuilderTemplate = true;
    this.gameType = this.singlePlayerGmaeType;
    console.log("Singleplayer Game Type Clicked:" + this.showGameBuilderTemplate);
  }

  public startNewGameClicked() {
    console.log("Game Type: -->" + this.gameType)
    console.log("Game Size: -->" + this.gameSize);
    console.log("Game Difficulty: -->" + this.gameDifficulty);
    console.log("Game Opponents: -->" + this.gameOpponents);

    this.gameBuilderService.buildGame(this.gameType, this.gameSize, this.gameDifficulty, this.gameOpponents)
      .subscribe(() =>  this._router.navigate(["game"], {state: {gameSize: this.gameSize} }));


  }
}
