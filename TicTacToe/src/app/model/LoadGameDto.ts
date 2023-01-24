export interface LoadGameDto {
  state: string;
  board: string;
  currentPlayerMove: string;
  difficulty: number;
  playerPawn: string
  size: number;
  awaitingPlayers?: number;
}
