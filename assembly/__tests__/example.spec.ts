import { welcome } from "..";

describe("example", () => {
  it("it should return welcome message", () => {
    expect(welcome()).toStrictEqual("welcome to the rock paper scissors game. You should write R for Rock, P for Paper, S for Scissors");
  })
});