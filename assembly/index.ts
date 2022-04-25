import { context, ContractPromiseBatch, logging, storage, u128 } from "near-sdk-as";

import { StateOfGame, RockPaperScissors, games } from "./model";

export function welcome(): string {
    return "welcome to the rock paper scissors game. You should write 1 for Rock, 2 for Paper, 3 for Scissors";
}

export function getGameId(): u32 {
    const id = storage.getPrimitive<u32>("gameId", 1);
    storage.set<u32>("gameId", id + 1);
    return id;
}

export function createGame(): u32 {
    assert(
        context.attachedDeposit > u128.Zero,
        "You must deposit at least 0.1 NEAR to create a game. Also this money is your bet."
    )

    logging.log("welcome to the rock paper scissors game. You should write 1 for Rock, 2 for Paper, 3 for Scissors");
    const game = new RockPaperScissors(getGameId());
    game.stateOfGame = StateOfGame.Created;
    games.set(game.gameId, game);
    return game.gameId;
}

export function joinGame(gameId: u32): string {
    assert(games.contains(gameId), "There is no game with this number");
    let game = games.getSome(gameId);
    assert(game.stateOfGame == StateOfGame.Created, "This game is unavailable. Need to be created state.");
    assert(
        context.attachedDeposit == game.challengeAmount,
        `You must deposit exactly ${game.challengeAmount} NEAR. Also this money is your bet.`
    )
    logging.log("welcome to the rock paper scissors game. You should write 1 for Rock, 2 for Paper, 3 for Scissors");
    game.player2 = context.sender;
    game.stateOfGame = StateOfGame.InProgress;
    games.set(game.gameId, game);

    return "Joined the game. Game is in progress.";
}

export function play(gameId: u32, playerChose: u8): string {
    assert(games.contains(gameId), "There is no game with this number")
    let game = games.getSome(gameId);
    assert(game.stateOfGame == StateOfGame.InProgress, "This game is unavailable. Need to be in progress");
    let currentPlayer = context.sender;
    if (currentPlayer == game.player1) {
        assert(game.player1sRight, "You used your chance to play")
        if (game.player1sRight) {
            if (playerChose === 1 || playerChose === 2 || playerChose === 3) {
                logging.log("You have played");
                game.player1sChose = playerChose;
                game.player1sRight = false;
                games.set(game.gameId, game);
            }
            else {
                logging.log("You should write 1 for Rock, 2 for Paper, 3 for Scissors");
            }
        }
    } else if (currentPlayer == game.player2) {
        assert(game.player2sRight, "You used your chance to play")
        if (game.player2sRight) {
            if (playerChose === 1 || playerChose === 2 || playerChose === 3) {
                logging.log("You have played");
                game.player2sChose = playerChose;
                game.player2sRight = false;
                games.set(game.gameId, game);
            }
            else {
                logging.log("You should write 1 for Rock, 2 for Paper, 3 for Scissors");
            }
        }
    }

    if (!game.player1sRight && !game.player2sRight) {
        let winnerId = "";
        let player1sChose = game.player1sChose;
        let player2sChose = game.player2sChose;

        if (player1sChose == 2 && player2sChose == 3) {
            winnerId = game.player2;
        }
        else if (player1sChose == 2 && player2sChose == 1) {
            winnerId = game.player1;
        }
        else if (player1sChose === player2sChose) {
            return "It's a tie!";
        }
        else if (player1sChose == 1 && player2sChose == 3) {
            winnerId = game.player1;
        }
        else if (player1sChose == 1 && player2sChose == 2) {
            winnerId = game.player2;
        }
        else if (player1sChose == 3 && player2sChose == 1) {
            winnerId = game.player2
        }
        else if (player1sChose == 3 && player2sChose == 2) {
            winnerId = game.player1;
        }

        game.stateOfGame = StateOfGame.Completed;
        const to_winner = ContractPromiseBatch.create(winnerId);
        const amount_to_receive = u128.add(game.challengeAmount, game.challengeAmount);
        to_winner.transfer(amount_to_receive);
        games.set(gameId, game);
        return `Congratulations: ${winnerId} is the winner and received ${amount_to_receive}`;
    } else {
        if (game.player1sRight == true && game.player2sRight == false) {
            return "Player 2 have played";
        }
        else if (game.player1sRight == false && game.player2sRight == true) {
            return "Player 1 have played";
        } else {
            return "Game is in progress you should play correctly";
        }

    }

}




