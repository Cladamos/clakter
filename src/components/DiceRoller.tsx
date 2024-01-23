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

type Dices = {
  svg: FC;
  damage: string;
};

const diceSvgs: Dices[] = [
  { svg: D4, damage: "1d4" },
  { svg: D6, damage: "1d6" },
  { svg: D8, damage: "1d8" },
  { svg: D10, damage: "1d10" },
  { svg: D12, damage: "1d12" },
  { svg: D20, damage: "1d20" },
];

function DiceRoller() {
  const { colorScheme } = useMantineColorScheme();
  const [dices, setDices] = useState<DiceResult[]>([]);
  const [input, setInput] = useState("");
  const [modifier, setModifier] = useState(0);
  const total = dices.reduce((acc, curr) => acc + curr.score, 0) + modifier;

  function handleButtonClick() {
    const output = DiceCalculator(input);
    console.log(output);
    setDices(output.results);
    setModifier(output.modifier);
  }
  function handleSvgClick(damage: string) {
    const output = DiceCalculator(damage);
    setDices(output.results);
    setModifier(0);
  }

  return (
    <Container size="md" py={100} h="100%">
      <Group gap={50}>
        <Group w="100%" justify="center">
          <Input
            size="lg"
            w={200}
            placeholder="1d6 + 3d10 + 8"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <Button size="lg" onClick={handleButtonClick}>
            Roll!
          </Button>
        </Group>
        <Group w="100%" justify="center">
          {diceSvgs.map((dice) => (
            <Tooltip label={`Roll ${dice.damage}`}>
              <Button
                onClick={() => handleSvgClick(dice.damage)}
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
              <Tooltip label="Modifier">
                <Text size="lg" fw={700}>
                  {modifier > 0 ? `+${modifier}` : modifier}
                </Text>
              </Tooltip>
            )}
          </Group>
          <Text size="xl"> Total: {total}</Text>
        </Group>
      </Group>
    </Container>
  );
}

export default DiceRoller;
