import * as fs from "fs";
import { newLineChar } from "../constants";

const rawInput = fs.readFileSync("./2023/08-input.txt", "utf8");
const input = rawInput.split(newLineChar);

const instruction = input[0];

const map = input.slice(2).map((l) => {
  const dests = l.split("(").slice(1)[0].split(",");
  return {
    from: l.split("=")[0].trim(),
    L: dests[0],
    R: dests[1].substring(1, 4),
  };
});
// console.log(map);

let currentLocation = "AAA";
let steps = 0;
while (currentLocation !== "ZZZ") {
  const navStep = instruction[steps % instruction.length] as "L" | "R";

  const instruc = map.find((m) => m.from === currentLocation);

  currentLocation = instruc![navStep];
  steps++;
}
console.log("reached destination", currentLocation, "in ", steps, "steps");

const startingNodes = map
  .filter((m) => m.from.endsWith("A"))
  .map((m) => m.from);

let reachedDestination2 = false;
let steps2 = 0;
let currentLocations = startingNodes;
const solutions: number[] = [];
while (!reachedDestination2) {
  const navStep = instruction[steps2 % instruction.length] as "L" | "R";

  currentLocations = currentLocations.map((s) => {
    const instruc = map.find((m) => m.from === s);
    return instruc![navStep];
  });
  steps2++;

  if (currentLocations.some((currLocation) => currLocation.endsWith("Z"))) {
    const index = currentLocations.findIndex((loc) => loc.endsWith("Z"));
    currentLocations.splice(index, 1);
    solutions.push(steps2);
    if (currentLocations.length === 0) reachedDestination2 = true;
  }
}

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

// Function to calculate the least common multiple (LCM) for an array of numbers
function lcmMultiple(numbers: number[]) {
  // Ensure non-negative values in the array
  const positiveNumbers = numbers.map((num) => Math.abs(num));

  // Helper function to calculate LCM for two numbers
  function lcmTwo(a: number, b: number) {
    return (a * b) / gcd(a, b);
  }

  // Iterate through the array and calculate LCM iteratively
  let result = positiveNumbers[0];
  for (let i = 1; i < positiveNumbers.length; i++) {
    result = lcmTwo(result, positiveNumbers[i]);
  }

  return result;
}

console.log({ solutionTwo: lcmMultiple(solutions) });
