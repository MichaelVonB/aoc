import * as fs from "fs";
import { newLineChar } from "../constants";

const rawInput = fs.readFileSync("./2023/07-input.txt", "utf8");
const input = rawInput.split(newLineChar);

type Hand = { cards: string[]; bid: number };
type Count = { [key: string]: number };

const cards: Count = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 0,
  Q: 12,
  K: 13,
  A: 14,
};

const findMaxNotJoker = (frequencies: Count) => {
  let max = "1";
  let count = 0;
  for (const key in frequencies) {
    if (key === "J") continue;
    if (frequencies[key] > count) {
      count = frequencies[key];
      max = key;
    } else if (frequencies[key] === count) {
      if (cards[key] > cards[max]) {
        count = frequencies[key];
        max = key;
      }
    }
  }
  return max;
};

const checkEqual = (input: string[]) => {
  const frequencyCounter: Count = {};

  // Count the occurrences of each number
  for (const num of input) {
    frequencyCounter[num] = (frequencyCounter[num] || 0) + 1;
  }
  const jokers = input.filter((i) => i === "J").length;
  if (jokers > 0) {
    const maxKey = findMaxNotJoker(frequencyCounter);

    if (maxKey !== "J") {
      frequencyCounter[maxKey!] += jokers;
    }
  }
  return frequencyCounter;
};

const isFiveOfAKind = (input: Count) => {
  const cards = Object.keys(input);
  if (cards.length === 1) return true;
  if (cards.length === 2 && cards.includes("J")) return true;
  return false;
};

const isFourOfAKind = (count: Count) => {
  return Object.values(count).some((c) => c >= 4);
};

const isFullHouse = (count: Count) => {
  if (Object.keys(count).length >= 4) return false;
  return (
    Object.values(count).some((c) => c === 3) &&
    Object.values(count).some((c) => c == 2)
  );
};

const isThreePair = (count: Count) => {
  return Object.values(count).some((c) => c === 3);
};

const isTwoPair = (count: Count) => {
  return Object.values(count).filter((c) => c === 2).length === 2;
};

const isPair = (count: Count) => {
  return Object.values(count).some((c) => c === 2);
};

const data: Hand[] = input.map((line) => {
  const split = line.split(" ");
  return { cards: split[0].split(""), bid: parseInt(split[1]) };
});

const fives: Hand[] = [];
const fours: Hand[] = [];
const fullHouses: Hand[] = [];
const threes: Hand[] = [];
const twoPairs: Hand[] = [];
const pairs: Hand[] = [];
const highest: Hand[] = [];

data.forEach((d) => {
  const count = checkEqual(d.cards);
  if (isFiveOfAKind(count)) return fives.push(d);
  if (isFourOfAKind(count)) return fours.push(d);
  if (isFullHouse(count)) return fullHouses.push(d);
  if (isThreePair(count)) return threes.push(d);
  if (isTwoPair(count)) return twoPairs.push(d);
  if (isPair(count)) return pairs.push(d);
  else highest.push(d);
});

const sortCards = (a: string[], b: string[]) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return cards[a[i]] - cards[b[i]];
    }
  }
  return 0;
};

fives.sort((a, b) => sortCards(a.cards, b.cards));
fours.sort((a, b) => sortCards(a.cards, b.cards));
fullHouses.sort((a, b) => sortCards(a.cards, b.cards));
threes.sort((a, b) => sortCards(a.cards, b.cards));
twoPairs.sort((a, b) => sortCards(a.cards, b.cards));
pairs.sort((a, b) => sortCards(a.cards, b.cards));
highest.sort((a, b) => sortCards(a.cards, b.cards));

console.log({ fives: JSON.stringify(fives) });
console.log({ fours: JSON.stringify(fours) });
console.log({ fullHouses: JSON.stringify(fullHouses) });
console.log({ threes: JSON.stringify(threes) });
console.log({ twoPairs: JSON.stringify(twoPairs) });
console.log({ pairs: JSON.stringify(pairs) });
console.log({ highest: JSON.stringify(highest) });

const solutionOne = [
  ...highest,
  ...pairs,
  ...twoPairs,
  ...threes,
  ...fullHouses,
  ...fours,
  ...fives,
]
  .map((hand, index) => {
    return { value: hand.bid * (index + 1), cards: hand.cards };
  })
  .reduce((acc, x) => acc + x.value, 0);

console.log({ solutionOne });
