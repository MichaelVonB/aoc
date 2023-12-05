import * as fs from "fs";
import { newLineChar } from "../constants";

const input = fs.readFileSync("./2023/04-input.txt", "utf8");

const solutionOne = input
  .split(newLineChar)
  .map((row) => row.split("|"))
  .map((num) => ({
    numbers: num[0]
      .split(":")[1]
      .trim()
      .split(" ")
      .map((n) => parseInt(n.trim())),
    winningNumbers: num[1]
      .trim()
      .split(" ")
      .map((n) => parseInt(n.trim())),
  }))
  .map(
    (numbers) =>
      numbers.numbers.filter((num) => numbers.winningNumbers.includes(num))
        .length
  )
  .map((points) => (points > 0 ? Math.pow(2, points - 1) : 0))
  .reduce((acc, x) => acc + x, 0);

console.log({ solutionOne });

const solutionTwo = input
  .split(newLineChar)
  .map((row) => row.split("|"))
  .map((num) => ({
    numbers: num[0]
      .split(":")[1]
      .trim()
      .split(" ")
      .map((n) => parseInt(n.trim())),
    winningNumbers: num[1]
      .trim()
      .split(" ")
      .map((n) => parseInt(n.trim())),
  }))
  .map(
    (numbers) =>
      numbers.numbers.filter((num) => numbers.winningNumbers.includes(num))
        .length
  )
  .map((num, index) => ({ cardNo: index + 1, correct: num, amount: 1 }));

const foo = solutionTwo
  .map((won) => {
    for (let i = won.cardNo; i < won.cardNo + won.correct; i++) {
      if (i < solutionTwo.length) {
        solutionTwo[i].amount += won.amount;
        console.log(
          "adding",
          won.amount,
          "to card",
          i + 1,
          "result:",
          solutionTwo[i].amount
        );
      }
    }
    return won;
  })
  .reduce((acc, x) => acc + x.amount, 0);

console.log(foo);
