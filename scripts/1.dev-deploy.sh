#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"

echo "deleting $CONTRACT"
echo
near delete $CONTRACT 

echo --------------------------------------------
echo
echo "cleaning up the /neardev folder"
echo
rm -rf ./neardev

# exit on first error after this point to avoid redeploying with successful build
set -e

echo --------------------------------------------
echo
echo "rebuilding the contract (release build)"
echo
yarn build

echo --------------------------------------------
echo
echo "redeploying the contract"
echo
near dev-deploy ./build/release/near-rock-paper-scissors-game.wasm

echo --------------------------------------------
echo run the following commands
echo
echo 'export CONTRACT=Your-Dev-ID-123-456.testnet'
echo 'You need to change account ids other script files'
echo 'You need to change account ids other script files'
echo 'You need to change account ids other script files'
echo
echo 'You need to call scripts this order: createGame.sh, joinGame.sh, play.sh'
echo 'You need to call scripts this order: createGame.sh, joinGame.sh, play.sh'
echo 'You need to call scripts this order: createGame.sh, joinGame.sh, play.sh'

exit 0