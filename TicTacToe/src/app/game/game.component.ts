import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';
import { WebSocketClient } from '../WebSocketApi';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private wsClient = new WebSocketClient("ws://localhost:8080/game?token="+this._auth.accessToken);

  public gameSizeArray: any[] = [];
  public gameState: string;

  constructor(private _auth: UserAuthService, private router: Router) {
    const size = this.router.getCurrentNavigation()?.extras.state?.['gameSize'];

    if (!size) {
      throw new Error("No gameSize route data!");
    }

    this.gameSizeArray = Array.from(Array(size).keys());
    this.gameState = "-".repeat(size ** 2);
   }

  async ngOnInit() {
    await this.wsClient.connect();
    this.wsClient.topic$("/topic/gameBoard").subscribe((m: any) => { 
      this.gameState = m.gameState;
    });
    this.wsClient.topic$("/topic/gameState").subscribe((m: any) => { 
      if (m.gameState === "FINISHED") {
        alert("Game over!");
      }
    });
  }

  public cellClicked(row: number, column: number) {
    const body = {
      i: (row * this.gameSizeArray.length + column).toString()
    };

    this.wsClient.send("/app/gameMove", body);
  }
}
