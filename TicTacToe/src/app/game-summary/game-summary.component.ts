import {Component} from '@angular/core';
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.scss']
})
export class GameSummaryComponent {

  constructor(
    public gameService: GameService
  ) {

  }
}
