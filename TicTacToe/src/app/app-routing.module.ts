import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameBuilderComponent } from './game-builder/game-builder.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import {AwaitingPlayersLobbyComponent} from "./awaiting-players-lobby/awaiting-players-lobby.component";
import {LocalGameBuilderComponent} from "./local-game-builder/local-game-builder.component";
import {OnlineGameBuilderComponent} from "./online-game-builder/online-game-builder.component";
import {GameParentComponent} from "./game-parent/game-parent.component";
import {GameSummaryComponent} from "./game-summary/game-summary.component";

// TODO ROUTE GUARDS
// TODO  GAME BUILDER STRATEGIES AS CHILDREN

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'game-builder', component: GameBuilderComponent },
  { path: 'local-game-builder', component: LocalGameBuilderComponent },
  { path: 'online-game-builder', component: OnlineGameBuilderComponent },
  { path: 'play', component: GameParentComponent, children: [
      { path: 'lobby', component: AwaitingPlayersLobbyComponent },
      { path: 'game', component: GameComponent },
      { path: 'summary', component: GameSummaryComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
