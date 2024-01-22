import D4 from "../assets/diceSvgs/dice-d4.svg";
import D6 from "../assets/diceSvgs/dice-d6.svg";
import D8 from "../assets/diceSvgs/dice-d8.svg";
import D10 from "../assets/diceSvgs/dice-d10.svg";
import D12 from "../assets/diceSvgs/dice-d12.svg";
import D20 from "../assets/diceSvgs/dice-d20.svg";

interface DiceData {
  count: number;
  sides: number;
}

interface ParsedInput {
  data: DiceData[];
  modifier: number;
}

interface DiceResult {
  score: number;
  type: string;
}

interface CalculatedOutput {
  results: DiceResult[];
  modifier: number;
}

const diceTypeMap: { [key: number]: string } = {
  4: D4,
  6: D6,
  8: D8,
  10: D10,
  12: D12,
  20: D20,
};

function parseDiceInput(input: string): ParsedInput {
  const parts = input.split("+");
  const data: DiceData[] = [];

  for (const part of parts) {
    const match = part.match(/(\d+)d(\d+)/);

    if (match) {
      const count = parseInt(match[1], 10);
      const sides = parseInt(match[2], 10);
      data.push({ count, sides });
    }
  }

  const modifierPart = parts.find((part) => !part.includes("d"));
  const modifier = modifierPart ? parseInt(modifierPart, 10) : 0;

  return { data, modifier };
}

function throwDice(input: string): CalculatedOutput {
  const { data, modifier } = parseDiceInput(input);

  const results: DiceResult[] = [];

  for (const roll of data) {
    for (let i = 0; i < roll.count; i++) {
      // Simulate rolling each die and add the result to the array
      const rollResult = Math.floor(Math.random() * roll.sides) + 1;
      results.push({ score: rollResult, type: diceTypeMap[roll.sides] });
    }
  }
  return { results, modifier: modifier };
}

function DiceCalculator(input: string) {
  return throwDice(input);
}

export default DiceCalculator;
