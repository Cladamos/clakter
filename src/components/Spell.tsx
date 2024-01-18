import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { useState } from "react";

type Props = {
  title: string;
  desc: string;
};

function Spell(props: Props) {
  const [status, setStatus] = useState(false);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{props.title}</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {props.desc}
      </Text>

      <Button
        fullWidth
        mt="md"
        radius="md"
        onClick={() => setStatus(!status)}
        // color={status === true ? "blue" : "green"}
        variant={status === true ? "filled" : "outline"}
      >
        {status === true ? "Added your spellbook" : "Add to your spellbook"}
      </Button>
    </Card>
  );
}

export default Spell;
