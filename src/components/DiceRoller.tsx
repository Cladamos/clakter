import { Container, Group, Input, Button, Text } from "@mantine/core";
import { IMaskInput } from "react-imask";
import DiceCalculator from "./DiceCalculator";

const input = "3d8+4d6+3";

function DiceRoller() {
  return (
    <Container size="xl" py={100}>
      <Group justify="center" w="100%">
        <Input
          component={IMaskInput}
          mask="0d00"
          size="lg"
          w={100}
          placeholder="1d20"
        />
        <Input
          component={IMaskInput}
          mask="+00"
          size="lg"
          w={100}
          placeholder="+5"
        />
        <Button size="lg">Roll!</Button>
      </Group>
      {DiceCalculator(input).map((num) => (
        <Text> {num} </Text>
      ))}
    </Container>
  );
}

export default DiceRoller;
