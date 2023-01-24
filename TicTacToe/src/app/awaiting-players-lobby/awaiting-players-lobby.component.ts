import {Component} from '@angular/core';
import {GameService} from "../service/game.service";
import {GameBuilderService} from "../service/game-builder.service";
import {interval, takeUntil, takeWhile} from "rxjs";

@Component({
  selector: 'app-awaiting-players-lobby',
  templateUrl: './awaiting-players-lobby.component.html',
  styleUrls: ['./awaiting-players-lobby.component.scss']
})

export class AwaitingPlayersLobbyComponent {
  public inviteCode: string;
  public emptyGameSlots: number;
  public yourPawn: string;

  constructor(public gameService: GameService, private gameBuilderService: GameBuilderService) {
    this.inviteCode = "";
    this.emptyGameSlots = 1;
    this.yourPawn = "";

    this.yourPawn = this.gameService.playerPawn;
  }

  ngOnInit(): void {
    this.gameBuilderService.getInviteCode().subscribe((res) => {
      console.log(res);
      this.inviteCode = res;
    });

    this.gameService.awaitingPlayers$.subscribe((res) => {
      console.log(res);
      this.emptyGameSlots = res;
    });
  }
}
