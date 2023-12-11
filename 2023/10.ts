import * as fs from "fs";
import { newLineChar, windowsThing } from "../constants";

const rawInput = fs.readFileSync("./2023/10-input.txt", "utf8");
const input = rawInput
  .split(newLineChar)
  .map((line) => line.replaceAll(windowsThing, ""));
type Position = { i: number; j: number };

const operators = {
  "|": (previousPosition: Position, currentPosition: Position): Position => ({
    i: currentPosition.i + Math.sign(currentPosition.i - previousPosition.i),
    j: currentPosition.j,
  }), //is a vertical pipe connecting north and south.
  "-": (previousPosition: Position, currentPosition: Position): Position => ({
    i: currentPosition.i,
    j: currentPosition.j + Math.sign(currentPosition.j - previousPosition.j),
  }), //is a horizontal pipe connecting east and west.
  L: (previousPosition: Position, currentPosition: Position): Position => ({
    i: currentPosition.i + Math.sign(currentPosition.j - previousPosition.j),
    j: currentPosition.j + Math.sign(currentPosition.i - previousPosition.i),
  }), //is a 90-degree bend connecting north and east.
  J: (previousPosition: Position, currentPosition: Position): Position => ({
    i: currentPosition.i + Math.sign(previousPosition.j - currentPosition.j),
    j: currentPosition.j + Math.sign(previousPosition.i - currentPosition.i),
  }), //is a 90-degree bend connecting north and west.
  "7": (previousPosition: Position, currentPosition: Position): Position => ({
    i: currentPosition.i + Math.sign(currentPosition.j - previousPosition.j),
    j: currentPosition.j + Math.sign(currentPosition.i - previousPosition.i),
  }), //is a 90-degree bend connecting south and west.
  F: (previousPosition: Position, currentPosition: Position): Position => ({
    i: currentPosition.i + Math.sign(previousPosition.j - currentPosition.j),
    j: currentPosition.j + Math.sign(previousPosition.i - currentPosition.i),
  }), //is a 90-degree bend connecting south and east.
  S: (previousPosition: Position, currentPosition: Position): Position => ({
    i: 0,
    j: 0,
  }),
};

type Operators = keyof typeof operators;

const map = input.map((line, i) =>
  line.split("").map((l, j) => l)
) as Operators[][];

// const realSChar = "J";
const realSChar = "L"; //CPO
// let previousPosition: Position = { i: 61, j: 10 }; //hardcode
// let currentPosition: Position = { i: 61, j: 9 }; //hardcode
let previousPosition: Position = { i: 115, j: 40 }; //hardcode CPO
let currentPosition: Position = { i: 114, j: 40 }; //hardcode
// let previousPosition: Position = { i: 1, j: 1 }; //hardcode
// let currentPosition: Position = { i: 2, j: 1 }; //hardcode

let currentOperator: Operators = "|"; //CPO
// let currentOperator: Operators = "F";
// let currentOperator: Operators = "|";
let iter = 1;

const inLoop: boolean[][] = [];

map.forEach(
  (_l, index) => (inLoop[index] = new Array(map[0].length).fill(false))
);

inLoop[currentPosition.i][currentPosition.j] = true;

while (currentOperator !== "S") {
  const nextPosition = operators[currentOperator](
    previousPosition,
    currentPosition
  );
  previousPosition = currentPosition;
  currentPosition = nextPosition;
  inLoop[currentPosition.i][currentPosition.j] = true;
  currentOperator = map[currentPosition.i][currentPosition.j];
  iter++;
}

console.log("took", iter, "steps");

console.log("furthest away is", iter / 2);

const cleanLoop = map.map((line, i) =>
  line.map((l, j) => {
    if (inLoop[i][j]) return l === "S" ? realSChar : l;
    else return ".";
  })
);

const inside: Position[] = [];

const loop: Position[] = [];

cleanLoop.forEach((line, i) => {
  line.forEach((v, j) => {
    if (v !== ".") {
      loop.push({ i, j });
    }
  });
});

cleanLoop.forEach((row, r) => {
  let within = false;
  let isUp: boolean | undefined;
  row.forEach((ch, c) => {
    if (ch === "|") within = !within;
    else if (ch === "L" || ch === "F") isUp = ch === "L";
    else if (ch === "7" || ch === "J") {
      if (ch != (isUp ? "J" : "7")) within = !within;
      isUp = undefined;
    }
    if (!within) {
      inside.push({ i: r, j: c });
    }
  });
});

let outsideSet = new Set(inside.map(({ i, j }) => `${i}-${j}`));
let loopSet = new Set(loop.map(({ i, j }) => `${i}-${j}`));

const foo = cleanLoop.map((row, rowIndex) => {
  return row.map((val, colIndex) => {
    const pos = `${rowIndex}-${colIndex}`;
    if (loopSet.has(pos) || outsideSet.has(pos)) {
      console.log("included");
      return ".";
    } else {
      return "X";
    }
  });
});

let notOutsiders = new Set([...outsideSet, ...loopSet]);
console.log(
  "there are",
  cleanLoop.length * cleanLoop[0].length - notOutsiders.size,
  "outside elements"
);

console.log(foo.map((row) => row.join("")).join("\n"));
