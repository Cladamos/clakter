import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { useState } from "react";
import { IconInfoCircle } from "@tabler/icons-react";

type Props = {
  title: string;
  level: string
  desc: string;
  index: string
  handleCurrSpell: (index: string) => void
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
        <Group>
          <Badge color="pink">{props.level}</Badge>
          <Button radius={100} px={5} size="xs" onClick={() => props.handleCurrSpell(props.index)}>
            <IconInfoCircle size={20} />
          </Button>
        </Group>
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
