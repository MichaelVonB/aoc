import * as fs from "fs";
import { newLineChar } from "../constants";

const rawInput = fs.readFileSync("./2023/12-input.txt", "utf8");

const damaged = "#";
const operational = ".";
const unknown = "?";

const cache: { [key: string]: number } = {};

const getPossibleArrangements = (
  arrangement: string,
  sequence: number[]
): number => {
  if (sequence.length === 0) return arrangement.includes(damaged) ? 0 : 1; //no numbers left, return valid if there is not damaged left, otherwise all ? can be operational
  if (arrangement.length === 0) return sequence.length === 0 ? 1 : 0; //no room for arrangements, return valid if all requirements have been met

  let result = 0;

  if (arrangement[0] === operational || arrangement[0] === unknown) {
    //count cases where next would be .
    result += getPossibleArrangements(arrangement.slice(1), sequence);
  }

  const cacheKey = `${arrangement}-${sequence.join(",")}`;

  if (cacheKey in cache) {
    return cache[cacheKey];
  }

  if (arrangement[0] === damaged || arrangement[0] === unknown) {
    //count cases when next would be #
    if (
      sequence[0] <= arrangement.length && //there needs to be enough room for arrangements
      !arrangement.slice(0, sequence[0]).includes(operational) && //withing the required number of damaged in a row cant be a operational
      (arrangement.length === sequence[0] ||
        arrangement[sequence[0]] !== damaged) //either the sequence ends after the current number of the next spring can be operational (. or ?, i.e. not #)
    ) {
      result += getPossibleArrangements(
        arrangement.slice(sequence[0] + 1),
        sequence.slice(1)
      );
    }
  }
  cache[cacheKey] = result;
  return result;
};

const calculateWith = (duplicates: number) => {
  const input = rawInput.split(newLineChar).map((line) => {
    const [springs, sequences] = line.split(" ");
    const seq = sequences.split(",").map((n) => parseInt(n));
    return {
      springs: Array(duplicates).fill(springs).join("?"),
      sequence: Array(duplicates).fill(seq).flat() as number[],
    };
  });
  let possibleArrangements = 0;
  input.forEach((line) => {
    possibleArrangements += getPossibleArrangements(
      line.springs,
      line.sequence
    );
  });

  return possibleArrangements;
};

console.log("solution 1:", calculateWith(1));
console.log("solution 2:", calculateWith(5));
