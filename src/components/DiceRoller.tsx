import {
  Container,
  Group,
  Input,
  Button,
  Text,
  Flex,
  useMantineColorScheme,
  Tooltip,
  Paper,
} from "@mantine/core";
import DiceCalculator, { DiceResult } from "./DiceCalculator";
import D4 from "../assets/diceSvgs/dice-d4.svg?react";
import D6 from "../assets/diceSvgs/dice-d6.svg?react";
import D8 from "../assets/diceSvgs/dice-d8.svg?react";
import D10 from "../assets/diceSvgs/dice-d10.svg?react";
import D12 from "../assets/diceSvgs/dice-d12.svg?react";
import D20 from "../assets/diceSvgs/dice-d20.svg?react";
import { FC, useState } from "react";
import classes from "./DiceRoller.module.css";
import {
  IconArrowBadgeLeft,
  IconArrowBadgeRight,
  IconSquareLetterM,
} from "@tabler/icons-react";

type Dices = {
  svg: FC;
  damage: string;
  count: number;
};

const diceSvgs: Dices[] = [
  { svg: D4, damage: "d4", count: 0 },
  { svg: D6, damage: "d6", count: 0 },
  { svg: D8, damage: "d8", count: 0 },
  { svg: D10, damage: "d10", count: 0 },
  { svg: D12, damage: "d12", count: 0 },
  { svg: D20, damage: "d20", count: 0 },
  { svg: IconSquareLetterM, damage: "", count: 0 },
];

function DiceRoller() {
  const { colorScheme } = useMantineColorScheme();
  const [dices, setDices] = useState<DiceResult[]>([]);
  const [input, setInput] = useState("");
  const [modifier, setModifier] = useState(0);
  const [count, setCount] = useState(diceSvgs.map(({ count }) => count));
  const total = dices.reduce((acc, curr) => acc + curr.score, 0) + modifier;

  function handleRollButtonClick() {
    const output = DiceCalculator(input);
    setDices(output.results);
    setModifier(output.modifier);
    setCount(diceSvgs.map(({ count }) => count));
    setInput("");
  }
  function handleSvgClick(damage: string) {
    const output = DiceCalculator(damage);
    setDices(output.results);
    setModifier(0);
  }

  function handleButtonClick(index: number, action: string) {
    const newCounts = [...count];

    if (action === "increase") {
      newCounts[index]++;
    }
    if (action === "decrease") {
      newCounts[index]--;
    }

    let input = "";
    for (let i = 0; i < newCounts.length; i++) {
      if (newCounts[i] > 0) {
        input += "+";
      }
      if (newCounts[i] != 0) {
        input += newCounts[i] + diceSvgs[i].damage;
      }
    }
    if (input[0] === "+") {
      input = input.slice(1);
    }
    setInput(input);

    setCount(newCounts);
  }
  return (
    <Container size="xl" my={150} h="100%">
      <Group gap={50}>
        <Group w="100%" justify="center">
          <Input
            size="lg"
            w={200}
            placeholder="1d6 + 3d10 + 8"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <Button size="lg" onClick={handleRollButtonClick}>
            Roll!
          </Button>
        </Group>
        <Group w="100%" justify="center" gap={30}>
          {diceSvgs.map((dice, index) => (
            <Flex direction="column" align="center" gap="sm">
              <Tooltip
                label={dice.damage === "" ? `Modifier` : `Roll ${dice.damage}`}
              >
                <Button
                  onClick={() => handleSvgClick(1 + dice.damage)}
                  className={classes.dice}
                  style={{
                    fill: colorScheme === "dark" ? "white" : "black",
                  }}
                  variant="default"
                  radius="md"
                  h="130"
                >
                  <dice.svg />
                </Button>
              </Tooltip>
              <Group gap={10}>
                <Button
                  px={1}
                  radius={4}
                  size="xs"
                  onClick={() => handleButtonClick(index, "decrease")}
                >
                  <IconArrowBadgeLeft />
                </Button>
                <Text>{count[index] + dice.damage}</Text>
                <Button
                  px={1}
                  radius={4}
                  size="xs"
                  onClick={() => handleButtonClick(index, "increase")}
                >
                  <IconArrowBadgeRight />
                </Button>
              </Group>
            </Flex>
          ))}
        </Group>

        <Group w="100%" justify="center" gap="md">
          <Group gap="xl" w="100%" justify="center" align="flex-end">
            {dices.map((dice) => (
              <Flex align="center" direction="column" gap={5}>
                <Paper
                  className={`${classes.dice} ${classes.small_dice}`}
                  style={{
                    fill: colorScheme === "dark" ? "white" : "black",
                  }}
                >
                  <dice.type />
                </Paper>
                <Text size="lg" fw={700}>
                  {dice.score}
                </Text>
              </Flex>
            ))}

            {modifier != 0 && (
              <Flex align="center" direction="column" gap={10}>
                <IconSquareLetterM size={40} />
                <Tooltip label="Modifier">
                  <Text size="lg" fw={700}>
                    {modifier > 0 ? `+${modifier}` : modifier}
                  </Text>
                </Tooltip>
              </Flex>
            )}
          </Group>
          <Text size="xl"> Total: {total}</Text>
        </Group>
      </Group>
    </Container>
  );
}

export default DiceRoller;
