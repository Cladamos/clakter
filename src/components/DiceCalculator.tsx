import { IconHelpHexagon } from "@tabler/icons-react"
import D4 from "../assets/diceSvgs/dice-d4.svg?react"
import D6 from "../assets/diceSvgs/dice-d6.svg?react"
import D8 from "../assets/diceSvgs/dice-d8.svg?react"
import D10 from "../assets/diceSvgs/dice-d10.svg?react"
import D12 from "../assets/diceSvgs/dice-d12.svg?react"
import D20 from "../assets/diceSvgs/dice-d20.svg?react"
import { FC } from "react"

type DiceData = {
  count: number
  sides: number
  operation: string
}

type ParsedInput = {
  data: DiceData[]
  modifier: number
}

export type DiceResult = {
  score: number
  type: FC
}

type CalculatedOutput = {
  results: DiceResult[]
  modifier: number
}

const diceTypeMap: { [key: number]: FC } = {
  4: D4,
  6: D6,
  8: D8,
  10: D10,
  12: D12,
  20: D20,
}

function parseDiceInput(input: string): ParsedInput {
  const parts = input.split(/([+-])/)
  const data: DiceData[] = []
  let modifier = 0
  let operation = "+"

  for (const part of parts) {
    const trimmedPart = part.trim()

    if (trimmedPart === "+") {
      operation = "+"
    } else if (trimmedPart === "-") {
      operation = "-"
    } else if (trimmedPart.includes("d")) {
      const match = trimmedPart.match(/(\d+)d(\d+)/)

      if (match) {
        const count = parseInt(match[1], 10)
        const sides = parseInt(match[2], 10)
        data.push({ count, sides, operation })
      }
    } else {
      const number = parseInt(trimmedPart, 10)

      if (!isNaN(number)) {
        if (operation === "+") {
          modifier += number
        } else {
          modifier -= number
        }
      }
    }
  }

  return { data, modifier }
}

/* function parseAyberk(input: string): ParsedInput {
  const data: DiceData[] = [];
  let modifier = 0;
  const mod = input.includes("-") ? "-" : "+";
  let tempParts = input.split(mod);
  // if positive look last index if it is not contains `d` it is dice, so no modifier
  // if negative last index is modifier

  const lastIdx = tempParts[tempParts.length - 1];
  if (!lastIdx.includes("d")) {
    modifier = Number(`${mod}${lastIdx}`);

    if (tempParts.length > 1) {
      tempParts.pop();
    }
  }

  console.log("modifier ", modifier);
  console.log("mod ", mod);

  if (mod === "-") {
    tempParts = tempParts[0].split("+");
  }
  console.log("tempParts ", tempParts);

  tempParts.forEach((part) => {
    const [count, sides] = part.split("d");
    data.push({ count: Number(count), sides: Number(sides) });
  });

  return { data, modifier };
} */

function throwDice(input: string): CalculatedOutput {
  const { data, modifier } = parseDiceInput(input)

  const results: DiceResult[] = []

  for (const roll of data) {
    for (let i = 0; i < roll.count; i++) {
      // Simulate rolling each die and add the result to the array
      let rollResult = Math.floor(Math.random() * roll.sides) + 1
      if (roll.operation === "-") {
        rollResult = rollResult * -1
      }
      const diceType = diceTypeMap[roll.sides] || IconHelpHexagon

      results.push({ score: rollResult, type: diceType })
    }
  }
  return { results, modifier: modifier }
}

function DiceCalculator(input: string) {
  return throwDice(input)
}

export default DiceCalculator
