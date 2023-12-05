import * as fs from "fs";
import { newLineChar } from "../constants";

const input = fs.readFileSync("./2023/03-input.txt", "utf8");

const symbols = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "=",
  "-",
  "+",
  "$",
  "/",
  "*",
  "@",
  "&",
  "#",
  "%",
];

const digitRegex = /\d+/g;
const rawData = input.split(newLineChar);

const maschineData = rawData.map((g) => {
  const matches = Array.from(g.matchAll(digitRegex));
  return matches.map((m) => {
    return { value: m[0], index: m.index! };
  });
});

const rowLength = rawData.length;
const colLength = rawData[0].length; //assuming all rows have the same length
const isAdjacentToSymbol = (rowIndex: number, colIndex: number) => {
  if (rowIndex < 0 || colIndex < 0) return false;
  if (rowIndex >= rowLength || colIndex >= colLength) return false;
  return symbols.includes(rawData[rowIndex][colIndex]);
};

const solutionOne = maschineData
  .map((data, rowIndex) => {
    const matches = data.map((rowData) => {
      for (
        let i = rowData.index - 1;
        i <= rowData.index + rowData.value.length;
        i++
      ) {
        if (isAdjacentToSymbol(rowIndex - 1, i)) return rowData.value;
        if (isAdjacentToSymbol(rowIndex + 1, i)) return rowData.value;
      }
      if (isAdjacentToSymbol(rowIndex, rowData.index - 1)) return rowData.value; //left
      if (isAdjacentToSymbol(rowIndex, rowData.index + rowData.value.length))
        return rowData.value; //right
      return "0"; //default
    });
    return matches.reduce((acc, x) => acc + parseInt(x), 0);
  })
  .reduce((acc, x) => acc + x, 0);

console.log({ solutionOne });

const numbers = maschineData
  .map((row, rowIndex) => {
    return row.map((col) => {
      return {
        value: col.value,
        x: rowIndex,
        yStart: col.index,
        yEnd: col.value.length + col.index - 1,
      };
    });
  })
  .flat(1);

const isInBoundingBox = (
  pos: { x: number; y: number },
  bbOx: { x: number; yStart: number; yEnd: number }
) => {
  if (pos.x === bbOx.x && pos.y <= bbOx.yEnd && pos.y >= bbOx.yStart)
    return true;
  return false;
};

const isAdjacentToStar = (
  star: { row: number; column: number },
  num: { x: number; yStart: number; yEnd: number }
) => {
  for (let i = star.column - 1; i <= star.column + 1; i++) {
    if (isInBoundingBox({ x: star.row - 1, y: i }, num)) return true;
    if (isInBoundingBox({ x: star.row + 1, y: i }, num)) return true;
  }
  return (
    isInBoundingBox({ x: star.row, y: star.column - 1 }, num) ||
    isInBoundingBox({ x: star.row, y: star.column + 1 }, num)
  );
};

const stars = rawData
  .map((row, index) =>
    Array.from(row.matchAll(/\*/g)).map((match) => ({
      row: index,
      column: match.index!,
    }))
  )
  .flat(1);

const solutionTwo = stars
  .map((star) => {
    const numberMatches = numbers.filter((n) => {
      return isAdjacentToStar(star, n);
    });
    if (numberMatches.length > 2) {
      console.warn("Something is wrong!!!", numberMatches);
      return 0;
    }
    if (numberMatches.length === 2)
      return numberMatches.reduce((acc, x) => acc * parseInt(x.value), 1);
    return 0;
  })
  .reduce((acc, x) => acc + x, 0);

console.log({ solutionTwo });
