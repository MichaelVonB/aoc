import * as fs from "fs";
import { newLineChar } from "../constants";

declare global {
  interface Array<T> {
    sum(): number;
  }
}

Array.prototype.sum = function () {
  return this.reduce((acc, num) => acc + num, 0);
};

const input = fs.readFileSync("./2022/input.txt", "utf8");

let caloriesCarriedByElves: number[] = input
  .split(newLineChar + newLineChar)
  .map((groups) =>
    groups
      .split(newLineChar)
      .map((num) => parseInt(num))
      .sum()
  );

caloriesCarriedByElves.sort((a, b) => b - a);
console.log(
  "** The solution to the first problem is",
  caloriesCarriedByElves[0]
);

const maxCarried = caloriesCarriedByElves
  .slice(0, 3)
  .reduce((acc, num) => acc + num, 0);
console.log("** The solution to the second problem is", maxCarried);
