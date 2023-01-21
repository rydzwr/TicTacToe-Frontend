import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GameBuilderComponent } from './game-builder/game-builder.component';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { AwaitingPlayersLobbyComponent } from './awaiting-players-lobby/awaiting-players-lobby.component';
import { LocalGameBuilderComponent } from './local-game-builder/local-game-builder.component';
import { OnlineGameBuilderComponent } from './online-game-builder/online-game-builder.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, GameBuilderComponent, GameComponent, AwaitingPlayersLobbyComponent, LocalGameBuilderComponent, OnlineGameBuilderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,  NgbModule, FormsModule ],
  providers: [{ provide: 'SERVER_URL', useValue: 'http://localhost:8080' }],
  bootstrap: [AppComponent],
})
export class AppModule { }
