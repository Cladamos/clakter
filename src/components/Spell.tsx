import { Card, Text, Badge, Button, Group, ActionIcon } from "@mantine/core"
import { useState } from "react"
import { IconInfoCircle } from "@tabler/icons-react"

type Props = {
  title: string
  level: string
  desc: string
  index: string
  handleCurrSpell: (index: string) => void
}

function Spell(props: Props) {
  const [status, setStatus] = useState(false)

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500} size="sm">
          {props.title}
        </Text>
        <Group>
          <Badge color="pink">{props.level === "0 Level" ? "Cantrip" : props.level}</Badge>
          <ActionIcon radius={100} size="md" onClick={() => props.handleCurrSpell(props.index)}>
            <IconInfoCircle size={20} />
          </ActionIcon>
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
  )
}

export default Spell
