import * as fs from "fs";
import { newLineChar } from "../constants";

const rawInput = fs.readFileSync("./2023/11-input.txt", "utf8");
const input = rawInput.split(newLineChar).map((line) => line.split(""));

type Position = { i: number; j: number };
const emptyRows: number[] = [];
const emptyColumns: number[] = [];
const galaxies: Position[] = [];

const emptyGalaxyExpansionFaktor = 1000000;

input.forEach((line, rowIndex) => {
  if (line.every((v) => v === ".")) {
    emptyRows.push(rowIndex);
  }
  line.forEach((v, columnIndex) => {
    if (v === "#") {
      galaxies.push({ i: rowIndex, j: columnIndex });
    }
  });
});

for (let index = 0; index < input[0].length; index++) {
  if (input.every((row) => row[index] === ".")) {
    emptyColumns.push(index);
  }
}

const addExpandedRows = (pos1: Position, pos2: Position) => {
  const from = Math.min(pos1.i, pos2.i);
  const to = Math.max(pos1.i, pos2.i);

  return (
    emptyRows.filter((p) => from < p && p < to).length *
    (emptyGalaxyExpansionFaktor - 1)
  );
};

const addExpandedColumns = (pos1: Position, pos2: Position) => {
  const from = Math.min(pos1.j, pos2.j);
  const to = Math.max(pos1.j, pos2.j);

  return (
    emptyColumns.filter((p) => from < p && p < to).length *
    (emptyGalaxyExpansionFaktor - 1)
  );
};

const minDistances: number[] = [];
for (let i = 0; i < galaxies.length; i++) {
  const galaxyFrom = galaxies[i];
  for (let j = i + 1; j < galaxies.length; j++) {
    if (i === j) continue;
    const galaxyTo = galaxies[j];
    let distance =
      Math.abs(galaxyFrom.i - galaxyTo.i) + Math.abs(galaxyFrom.j - galaxyTo.j);
    distance +=
      addExpandedColumns(galaxyFrom, galaxyTo) +
      addExpandedRows(galaxyFrom, galaxyTo);

    minDistances.push(distance);
  }
}

console.log(minDistances.reduce((acc, x) => acc + x, 0));
