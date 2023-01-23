import {Component } from '@angular/core';
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  public gameSizeArray: any[] = [];

  constructor(
    public gameService: GameService
  ) {
    this.gameSizeArray = Array.from(Array(gameService.gameSize).keys());
  }

  public cellClicked(row: number, column: number) {
    this.gameService.playerMove(row, column);
  }
}
