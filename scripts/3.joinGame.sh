#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1

echo
echo 'About to call joinGame function for player 2'
echo 'If you call joinGame you will be set as player 2'
echo  near call $CONTRACT joinGame '{"gameId":1}'  --accountId accountId.testnet --amount
echo
echo \$CONTRACT is $CONTRACT
echo 
echo  'You should write accountId.testnet as player 2'
echo  'You should write accountId.testnet as player 2'
echo  'You should write accountId.testnet as player 2'
echo 
echo  'You must write gameid amount before using script'
echo  'You must write gameid amount before using script'
echo  'You must write gameid amount before using script'
echo
echo  'You must write same amount as player 1s amount before using script'
echo  'You must write same amount as player 1s amount before using script'
echo  'You must write same amount as player 1s amount before using script'
near call $CONTRACT joinGame '{"gameId":1}'  --accountId accountId.testnet --amount 0.1