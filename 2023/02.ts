import * as fs from "fs";
import { newLineChar } from "../constants";

const input = fs.readFileSync("./2023/02-input.txt", "utf8");

const maxRedCubes = 12;
const maxGreenCubes = 13;
const maxBlueCubes = 14;

const divider = /,|;/;
const gameData = input
  .split(newLineChar)
  .map((data) => ({
    id: parseInt(data.split(" ")[1].split(":")[0]),
    turns: data.split(":")[1].trim(),
  }))
  .map((data) => {
    const rounds = data.turns.split(divider);
    return {
      id: data.id,
      turns: rounds.map((round) => {
        return {
          cubes: parseInt(round),
          color: round.trim().split(" ")[1],
        };
      }),
    };
  });

const solutionOne = gameData
  .filter((turnData) => {
    const valid = turnData.turns.every((turn) => {
      if (turn.color === "green") {
        return turn.cubes <= maxGreenCubes;
      }
      if (turn.color === "red") {
        return turn.cubes <= maxRedCubes;
      }
      if (turn.color === "blue") {
        return turn.cubes <= maxBlueCubes;
      } else true;
    });
    return valid;
  })
  .map((game) => game.id)
  .reduce((acc, x) => acc + x, 0);

console.log({ solutionOne });

const solutionTwo = gameData
  .map((game) => {
    const grouped = game.turns.reduce((group, turn) => {
      const { color } = turn;
      group[color] = group[color] ?? [];
      group[color].push(turn.cubes);
      return group;
    }, {} as any);
    return grouped;
  })
  .map(
    (grouped) =>
      Math.max(...grouped.blue) *
      Math.max(...grouped.green) *
      Math.max(...grouped.red)
  )
  .reduce((acc, x) => acc + x);

console.log({ solutionTwo });
