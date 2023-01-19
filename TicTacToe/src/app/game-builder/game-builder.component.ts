import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {GameBuilderService} from '../service/game-builder.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-game-builder',
  templateUrl: './game-builder.component.html',
  styleUrls: ['./game-builder.component.scss'],
})
export class GameBuilderComponent {
  public gameSize: number;
  public gameDifficulty: number;
  public gameOpponents: number;

  // HTML STATUSES
  public startNewGame: boolean = false;
  public singlePlayerGameType: boolean = false;
  public showGameBuilderTemplate: boolean = false;

  constructor(
    public userService: UserService,
    private _router: Router,
    public gameBuilderService: GameBuilderService
  ) {
    // RANDOM GAME PROPERTIES SHOWN IN HTML INPUTS
    this.gameSize = 10;
    this.gameDifficulty = 6;
    this.gameOpponents = 2;
  }

  ngOnInit(): void {
    this.userService.canResumeGame();
  }

  public continueGameClicked() {
    this.gameBuilderService.continueGame().subscribe((res) => {
      console.log("Continue game returned:");
      console.log(res);
      this._router.navigate(['game'], {state: res});
    });
  }

  public startNewGameClicked() {
    this.gameBuilderService
      .buildGame(
        this.gameSize,
        this.gameDifficulty,
        this.gameOpponents
      )
      .subscribe(() => {
        const newGameDto = {
          gameSize: this.gameSize
        };
        this._router.navigate(['game'], {state: newGameDto});
      });
  }

  public newGameClicked() {
    this.startNewGame = true;
  }

  public singlePlayerClicked() {
    this.showGameBuilderTemplate = true;
  }
}

