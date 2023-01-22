import {Component, OnInit} from '@angular/core';
import {GameBuilderService} from "../service/game-builder.service";
import {Router} from "@angular/router";
import {interval} from "rxjs";
import {LoadGameDto} from "../model/LoadGameDto";

@Component({
  selector: 'app-awaiting-players-lobby',
  templateUrl: './awaiting-players-lobby.component.html',
  styleUrls: ['./awaiting-players-lobby.component.scss']
})

export class AwaitingPlayersLobbyComponent implements OnInit {
  public inviteCode: string;
  public emptyGameSlots: number;
  public gameSize: number;
  public pawn: string;

  private _refreshInterval = interval(4000);

  constructor(private gameBuilderService: GameBuilderService,private router: Router) {
    this.inviteCode = "";
    this.emptyGameSlots = 1;

    if (this.emptyGameSlots != 0) {
      this._refreshInterval.subscribe((val) => this.getEmptyGameSlots());
    }

    const gameState = this.router.getCurrentNavigation()?.extras.state as LoadGameDto;

    if (!gameState) {
      throw new Error('No gameState route data!');
    }

    this.gameSize = gameState.gameSize;
    this.pawn = gameState.pawn;
  }


  ngOnInit(): void {
    this.gameBuilderService.getInviteCode().subscribe((res) => {
      console.log(res);
      this.inviteCode = res;
    });
  }

  private getEmptyGameSlots() {
    this.gameBuilderService.getEmptyGameSlots().subscribe((res) => {
      console.log(res);
      this.emptyGameSlots = res;
    })

    const newGameDto = {
      gameSize: this.gameSize,
      pawn: this.pawn
    };

    if (this.emptyGameSlots == 0) {
      this.router.navigate(['game'], {state: newGameDto});
    }
  }
}
