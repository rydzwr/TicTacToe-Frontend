import {Component, OnInit} from '@angular/core';
import {WebSocketClient} from "../service/WebSocketApi";
import {GameService} from "../service/game.service";
import {Router} from "@angular/router";
import {LoadGameDto} from "../model/LoadGameDto";

@Component({
  selector: 'app-game-parent',
  templateUrl: './game-parent.component.html',
  styleUrls: ['./game-parent.component.scss'],
  providers: [ GameService ]
})
export class GameParentComponent implements OnInit {
  private gameData: LoadGameDto;

  constructor(private router: Router, private _gameService: GameService) {
    this.gameData = this.router.getCurrentNavigation()?.extras.state as LoadGameDto;
  }

  async ngOnInit() {
    console.log(this.gameData);
    await this._gameService.startGame(this.gameData);

    if (this._gameService.gameState === "AWAITING_PLAYERS") {
      await this.router.navigate(['play', 'lobby']);
    } else if (this._gameService.gameState === "IN_PROGRESS") {
      await this.router.navigate(['play', 'game']);
    } else {
      throw new Error("Invalid game state!");
    }

    this._gameService.gameState$.subscribe(state => {
      console.log("GS change");
      console.log(state);
      if (state === "FINISHED") {
        this.router.navigate(['play', 'summary']);
      } else if (state === "IN_PROGRESS") {
        this.router.navigate(['play', 'game']);
      }
    });
  }
}
