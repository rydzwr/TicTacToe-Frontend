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

  private _refreshInterval = interval(400);

  constructor(public gameService: GameService, private gameBuilderService: GameBuilderService) {
    this.inviteCode = "";
    this.emptyGameSlots = 1;
    this.yourPawn = "";

    this.gameService.awaitingPlayers$.subscribe((res) => {
      console.log("AWAITING PLAYERS COUNT: --> " + res);
      this.emptyGameSlots = res;
    })

    this.yourPawn = this.gameService.playerPawn;
    this._refreshInterval.subscribe((val) => this.gameBuilderService.getEmptyGameSlots().subscribe((res) => {
      console.log(res);
      this.emptyGameSlots = res;
    }));
  }

  ngOnInit(): void {
    this.gameBuilderService.getInviteCode().subscribe((res) => {
      console.log(res);
      this.inviteCode = res;
    });

    this.gameBuilderService.getEmptyGameSlots().subscribe((res) => {
      console.log(res);
      this.emptyGameSlots = res;
    });
  }
}
