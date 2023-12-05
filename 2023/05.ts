import * as fs from "fs";
import { newLineChar } from "../constants";

const rawInput = fs.readFileSync("./2023/05-input.txt", "utf8");
const input = rawInput.split(newLineChar);

const seeds = input[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((num) => parseInt(num));

const groupedSeeds: { start: number; range: number }[] = [];
for (let i = 0; i < seeds.length; i += 2) {
  groupedSeeds.push({ start: seeds[i], range: seeds[i + 1] });
}

const mapData = input.slice(2);

const solutionOne = rawInput
  .split(newLineChar + newLineChar)
  .slice(1)
  .map((block) => {
    const split = block.split(newLineChar);
    const header = split[0];
    return {
      from: header.split("-to-")[0],
      to: header.split("-to-")[1].split(" ")[0],
      mappings: split.slice(1),
    };
  })
  .map((data) => {
    const mappings = data.mappings.map((mapping) => {
      const split = mapping.split(" ");
      return {
        startTo: parseInt(split[0]),
        start: parseInt(split[1]),
        range: parseInt(split[2]),
      };
    });
    return { ...data, mappings };
  });

console.log({ solutionOne });

const mapLocation = (
  mappings: {
    start: number;
    startTo: number;
    range: number;
  }[],
  location: number
) => {
  const rule = mappings.find(
    (m) => m.start <= location && location <= m.start + m.range
  );
  if (!rule) return location;
  return location - rule.start + rule.startTo;
};

const seedMap = seeds.map((seed) => {
  let location = seed;
  solutionOne.forEach((mapping) => {
    location = mapLocation(mapping.mappings, location);
  });
  return { seed, location };
});

console.log({ solutionOne: Math.min(...seedMap.map((m) => m.location)) });

console.log({ groupedSeeds });

let min = 26165609399999;
console.time("sol2");
groupedSeeds.map((seeds, index) => {
  for (let i = 0; i < seeds.range; i++) {
    let location = seeds.start + i;
    solutionOne.forEach((mapping) => {
      location = mapLocation(mapping.mappings, location);
    });
    if (location < min) {
      min = location;
    }
  }
  console.timeLog("sol2", "finished seed");
  console.log("calculated locations for first seed group. Min is", min);
});
console.timeEnd("sol2");
console.log({ solutionTwo: min }); //solutin might be off by -1
