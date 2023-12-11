import * as fs from "fs";
import { newLineChar } from "../constants";

const rawInput = fs.readFileSync("./2023/06-input.txt", "utf8");
const input = rawInput.split(newLineChar);

const digitsRegex = /\d+/g;

const time = Array.from(input[0].matchAll(digitsRegex));
const records = Array.from(input[1].matchAll(digitsRegex));

const races = time.map((t, i) => {
  return { time: parseInt(t[0]), record: parseInt(records[i][0]) };
});

const singleRace = {
  time: Number(time.map((t) => t[0]).join("")),
  record: Number(records.map((r) => r[0]).join("")),
};

const checkIfWin = (
  speedTime: number,
  raceDuration: number,
  record: number
) => {
  return speedTime * (raceDuration - speedTime) > record;
};

const solutionOne = races
  .map((raceData) => {
    let wins = 0;
    for (let i = 1; i < raceData.time; i++) {
      if (checkIfWin(i, raceData.time, raceData.record)) wins++;
    }
    return wins;
  })
  .reduce((acc, x) => acc * x, 1);

console.log({ solutionOne });

let wins2 = 0;
for (let i = 1; i < singleRace.time; i++) {
  if (checkIfWin(i, singleRace.time, singleRace.record)) wins2++;
}
console.log({ wins2 });
