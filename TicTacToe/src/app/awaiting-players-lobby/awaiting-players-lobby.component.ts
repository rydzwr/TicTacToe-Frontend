import {Component, OnInit} from '@angular/core';
import {GameBuilderService} from "../service/game-builder.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-awaiting-players-lobby',
  templateUrl: './awaiting-players-lobby.component.html',
  styleUrls: ['./awaiting-players-lobby.component.scss']
})

export class AwaitingPlayersLobbyComponent implements OnInit {
  public inviteCode: string;

  constructor(private gameBuilderService: GameBuilderService,private router: Router) {
    this.inviteCode = "";
  }


  ngOnInit(): void {
    this.gameBuilderService.getInviteCode().subscribe((res) => {
      console.log(res);
      this.inviteCode = res;
    });
  }
}
