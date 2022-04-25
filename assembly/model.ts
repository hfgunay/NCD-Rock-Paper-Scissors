import { storage, u128, context, PersistentMap } from "near-sdk-as";



export enum StateOfGame {
    Created,
    InProgress,
    Completed
}
@nearBindgen
export class RockPaperScissors {
    gameId: u32;
    stateOfGame: StateOfGame;
    player1: string;
    challengeAmount: u128;
    player2: string;
    player1sChose: u8;
    player2sChose: u8;
    player1sRight: boolean;
    player2sRight: boolean;

    constructor(gameId: u32) {

        this.gameId = gameId;
        this.stateOfGame = StateOfGame.Created;
        this.player1 = context.sender;
        this.challengeAmount = context.attachedDeposit;
        this.player2 = "";
        this.player1sChose = 0;
        this.player2sChose = 0;
        this.player1sRight = true; //If player1 still has chance to play it is true. If s/he used her/his right it is false.
        this.player2sRight = true;

    }
}

export const games = new PersistentMap<u32, RockPaperScissors>("g");