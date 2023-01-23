import {Injectable} from '@angular/core';
import {WebSocketClient} from "./WebSocketApi";
import {UserAuthService} from "./user-auth.service";
import {BehaviorSubject, EMPTY, empty, Observable, of} from "rxjs";
import {LoadGameDto} from "../model/LoadGameDto";
import {GameBuilderService} from "./game-builder.service";

@Injectable()
export class GameService {
  public get gameBoard$() {
    return this._gameBoardSubject.asObservable();
  }

  public get gameState$() {
    return this._gameStateSubject.asObservable();
  }

  public get currentPlayer$() {
    return this._currentPlayerSubject.asObservable();
  }

  public get gameError$() {
    return this._gameError$;
  }

  public get gameBoard() {
    return this._gameBoardSubject.getValue();
  }

  public get gameState() {
    return this._gameStateSubject.getValue();
  }

  public get currentPlayer() {
    return this._currentPlayerSubject.getValue();
  }

  public get gameSize() {
    return this._gameSize;
  }

  public get gameDifficulty() {
    return this._gameDifficulty;
  }

  public get playerPawn() {
    return this._playerPawn;
  }

  public get awaitingPlayers$() {
    return this._awaitingPlayersSubject.asObservable();
  }

  public get awaitingPlayers() {
    return this._awaitingPlayersSubject.getValue();
  }

  private _gameSize: number = 0;
  private _gameDifficulty: number = 0;
  private _playerPawn: string = "";

  private _gameBoard$: Observable<string> = EMPTY;
  private _gameState$: Observable<string> = EMPTY;
  private _gameError$: Observable<string> = EMPTY;
  private _awaitingPlayers$: Observable<number> = EMPTY;

  private _gameBoardSubject = new BehaviorSubject<string>("");
  private _gameStateSubject = new BehaviorSubject<string>("");
  private _currentPlayerSubject = new BehaviorSubject<string>("");
  private _awaitingPlayersSubject = new BehaviorSubject<number>(0);

  private wsClient = new WebSocketClient(
    'ws://localhost:8080/game?token=' + this._auth.accessToken
  );

  constructor(private _auth: UserAuthService, private gameBuilderService: GameBuilderService) { }

  public async startGame(gameData: LoadGameDto) {
    if (!gameData) {
      throw new Error('No gameState route data!');
    }

    await this.connect();

    this._gameSize = gameData.size;
    this._gameDifficulty = gameData.difficulty;
    this._playerPawn = gameData.playerPawn;

    this._currentPlayerSubject.next(gameData.currentPlayerMove);
    this._gameStateSubject.next(gameData.state);
    this._gameBoardSubject.next(gameData.board);
  }

  private async connect() {
    await this.wsClient.connect();

    this._gameState$ = this.wsClient.topic$("/topic/gameState");
    this._gameBoard$ = this.wsClient.topic$("/topic/gameBoard");
    this._gameError$ = this.wsClient.topic$("/topic/gameError");
    this._awaitingPlayers$ = this.gameBuilderService.getEmptyGameSlots();

    this._gameBoard$.subscribe((m: any) => {
      this._gameBoardSubject.next(m.gameBoard); // TODO: REPLACE ANY WITH INTERFACE AND CHANGE GAME STATE TO BOARD IN SPRING
      this._currentPlayerSubject.next(m.currentPlayerMove);
    });

    this._gameState$.subscribe((m: any) => this._gameStateSubject.next(m.gameState));
    this._gameError$.subscribe(error => console.log(error));
    this._awaitingPlayers$.subscribe((players) => this._awaitingPlayersSubject.next(players));
  }

  public async playerMove(row: number, column: number) {
    const body = {
      gameBoardElementIndex: (
        row * this.gameSize + column
      ).toString(),
    };

    this.wsClient.send('/app/gameMove', body);
  }

}
