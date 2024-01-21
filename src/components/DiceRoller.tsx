import { Container, Group, Input, Button, Text, Image } from "@mantine/core";
import DiceCalculator from "./DiceCalculator";
import D4 from "../assets/diceSvgs/dice-d4.svg";
import D6 from "../assets/diceSvgs/dice-d6.svg";
import D8 from "../assets/diceSvgs/dice-d8.svg";
import D10 from "../assets/diceSvgs/dice-d10.svg";
import D12 from "../assets/diceSvgs/dice-d12.svg";
import D20 from "../assets/diceSvgs/dice-d20.svg";
import { useState } from "react";

type Dices = {
  src: string;
  damage: string;
};

const diceSvgs: Dices[] = [
  { src: D4, damage: "1d4" },
  { src: D6, damage: "1d6" },
  { src: D8, damage: "1d8" },
  { src: D10, damage: "1d10" },
  { src: D12, damage: "1d12" },
  { src: D20, damage: "1d20" },
];

function DiceRoller() {
  const [dices, setDices] = useState([0]);
  const [input, setInput] = useState("");
  const [modifier, setModifier] = useState(0);

  function handleButtonClick() {
    const output = DiceCalculator(input);
    setDices(output.rolls);
    setModifier(output.modifier);
  }
  function handleSvgClick(damage: string) {
    const output = DiceCalculator(damage);
    setDices(output.rolls);
    setModifier(0);
  }

  return (
    <Container size="xl" py={100} h="100%">
      <Group gap={50}>
        <Group w="100%" justify="center">
          <Input.Wrapper
            description="You can write multiple things as showned"
            size="xs"
          >
            <Input
              size="lg"
              w={200}
              placeholder="1d6 + 3d10 + 8"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </Input.Wrapper>

          <Button size="lg" onClick={handleButtonClick}>
            Roll!
          </Button>
        </Group>
        <Group w="100%" justify="center">
          {diceSvgs.map((dice) => (
            <Image
              src={dice.src}
              h={100}
              w={100}
              onClick={() => handleSvgClick(dice.damage)}
            ></Image>
          ))}
        </Group>

        <Group w="100%" justify="center">
          {dices.map((num) => (
            <Text> {num}</Text>
          ))}
          <Text>{modifier}</Text>
        </Group>
      </Group>
    </Container>
  );
}

export default DiceRoller;
