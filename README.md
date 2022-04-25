# Rock-Paper-Scissors game as a NEAR contract

Video demo: [here]()


## Install dependencies
```
yarn
```

## Build and Deploy the contract
```
yarn asb
near dev-deploy ./build/release/near-rock-paper-scissors-game.wasm
# copy the game id in your clipboard and send it to player 2
```

## How to Play

1. Player 1 call function `createGame` passing the attached value (at least 0.1 NEAR), and send gameId to player 2
2. Player 2 call function `joinGame(gameId)` passing gameId that player one sent, also passing the attached value (Exactly same amount as player 1's)
3. Call function `play(gameId: u32, playerChose: u8)` with gameId and playerChose as argument
4. playerChose argument means rock, paper or scissors. You should write 1 for Rock, 2 for Paper and 3 for Scissors.
5. The plays continue until every player play.
6. After every player play, function return a message like 'Congratulations: hfgunay.testnet is the winner and received 200000000000000000000000'
7. When someone win, the attached deposit will be transfered to the wallet of the winner.

## Run the game
**Create a game**
```
near call <contract-id> createGame --account_id <account-id> --amount 0.1
# save the game id in your clipboard and send it to your opponent
```

**Join a game (player 2)**
```
near call <contract-id> joinGame '{"gameId": <game-id>}' --account_id <account-id> --amount 0.1
If it didn't work try: near call <contract-id> joinGame '{"""gameId""":9}'  --account_id <account-id> --amount 0.1
```

**Play the game**
```
near call <contract-id> play `play(gameId: u32, playerChose: u8)` --account_id <account-id>
If it didn't work try: near call <contract-id> play '{"""gameId""":9,"""playerChose""":2}'  --account_id <account-id>
```
