import * as fs from "fs";
import { newLineChar } from "../constants";

const rawInput = fs.readFileSync("./2023/09-input.txt", "utf8");
const input = rawInput.split(newLineChar);

const diffs = input.map((i) => {
  let allZeros = false;
  const differences = [i.split(" ").map((n) => parseInt(n))];
  let iteration = 0;
  while (!allZeros) {
    const currentDiff = differences[iteration];
    const newDiff: number[] = [];
    for (let index = 0; index < currentDiff.length - 1; index++) {
      newDiff.push(currentDiff[index + 1] - currentDiff[index]);
    }
    iteration++;
    differences.push(newDiff);
    if (newDiff.every((num) => num === 0)) allZeros = true;
  }
  return differences;
});

const solsOne = diffs.map((line) => {
  let num = 0;
  for (let index = line.length - 1; index >= 0; index--) {
    num = num + line[index][line[index].length - 1];
  }
  return num;
});

const solsTwo = diffs
  .map((line) => {
    let num = 0;

    for (let index = line.length - 1; index >= 0; index--) {
      num = -num + line[index][0];
    }
    return num;
  })
  .reduce((acc, x) => acc + x, 0);

function onlyUnique(value: any, index: any, array: string | any[]) {
  return array.indexOf(value) === index;
}

console.log({ solutionOne: solsOne.reduce((acc, x) => acc + x, 0) });

console.log({ solsTwo });
