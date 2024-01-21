interface DiceRoll {
  count: number;
  sides: number;
}

interface ParsedInput {
  rolls: DiceRoll[];
  modifier: number;
}

function parseDiceInput(input: string): ParsedInput {
  const parts = input.split("+");
  const rolls: DiceRoll[] = [];

  for (const part of parts) {
    const match = part.match(/(\d+)d(\d+)/);

    if (match) {
      const count = parseInt(match[1], 10);
      const sides = parseInt(match[2], 10);
      rolls.push({ count, sides });
    }
  }

  const modifierPart = parts.find((part) => !part.includes("d"));
  const modifier = modifierPart ? parseInt(modifierPart, 10) : 0;

  return { rolls, modifier };
}

function calculateDices(dices: ParsedInput) {
  const output = [];
  let arr: number[];
  for (let i = 0; i < dices.rolls.length; i++) {
    arr = throwDice(dices.rolls[i].count, dices.rolls[i].sides);
    for (let i = 0; i < arr.length; i++) {
      output.push(arr[i]);
    }
  }
  return { rolls: output, modifier: dices.modifier };
}

function throwDice(count: number, sideNum: number): number[] {
  let rand;
  const res = [];
  for (let i = 0; i < count; i++) {
    rand = Math.floor(1 + Math.random() * sideNum);
    res.push(rand);
  }
  return res;
}

function DiceCalculator(input: string) {
  return calculateDices(parseDiceInput(input));
}

export default DiceCalculator;
