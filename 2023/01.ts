import * as fs from "fs";
import { newLineChar } from "../constants";

const input = fs.readFileSync("./2023/01-input.txt", "utf8");
const digitMatch = /\d/g;
const numberMatch =
  /(?=((one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|\d))/g;
const solutionOne = input
  .split(newLineChar)
  .map((i) => i.match(digitMatch)?.join(""))
  .map((numbers) => numbers![0] + numbers![numbers!.length - 1])
  .map((number) => parseInt(number))
  .reduce((acc, x) => acc + x, 0);

console.log({ solutionOne });

const numbers: Map<string, string> = new Map([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);

// const

const solutionTwo = input
  .split(newLineChar)
  .map((n) => Array.from(n.matchAll(numberMatch)))
  .map((v) => v![0][1] + v![v.length - 1][1])
  .map((line) => {
    let result = line;
    numbers.forEach((value, key) => (result = result.replaceAll(key, value)));
    return result;
  })
  .map((numbers) => numbers![0] + numbers![numbers!.length - 1])
  .map((number) => parseInt(number))
  .reduce((acc, x) => acc + x, 0);

console.log({ solutionTwo });
