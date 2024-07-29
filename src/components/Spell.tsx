import { Card, Text, Badge, Button, Group, ActionIcon, Tooltip } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"
import { useCharacter } from "../contexts/CharacterContext"
import { notifications } from "@mantine/notifications"
import { useState } from "react"

type Props = {
  title: string
  level: string
  desc: string
  index: string
  handleCurrSpell: (spell: string) => void
}

function Spell(props: Props) {
  const characterCtx = useCharacter()
  const [isInSpellbook, setIsInSpellbook] = useState(
    characterCtx.currCharacter?.spells.results.find((s) => s.index === props.index) === undefined ? false : true,
  )

  function handleAdd() {
    if (!characterCtx.currCharacter) {
      notifications.show({
        title: "Error",
        message: "Unexpected error occured",
        color: "red",
      })
      return
    }

    const currSpell = { index: props.index, name: props.title, level: props.level }
    let newSpells: {
      index: string
      name: string
      level: string
    }[] = []

    console.log(currSpell)
    if (isInSpellbook) {
      newSpells = characterCtx.currCharacter.spells.results.filter((s) => s.index !== currSpell.index)
      setIsInSpellbook(false)
    } else {
      newSpells = [...characterCtx.currCharacter.spells.results, currSpell]
      setIsInSpellbook(true)
    }
    characterCtx.setCurrCharacter((c) => {
      if (c === null) {
        return null
      }
      return { ...c, spells: { results: newSpells } }
    })
    console.log(newSpells)
  }
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500} size="sm">
          {props.title}
        </Text>
        <Group>
          <Badge color="pink">{props.level == "0" ? "Cantrip" : "Level " + props.level}</Badge>
          <ActionIcon radius={100} size="md" onClick={() => props.handleCurrSpell(props.index)}>
            <IconInfoCircle size={20} />
          </ActionIcon>
        </Group>
      </Group>

      <Text size="sm" c="dimmed">
        {props.desc}
      </Text>
      {characterCtx.currCharacter ? (
        <Button fullWidth mt="md" radius="md" onClick={handleAdd} variant={isInSpellbook ? "filled" : "outline"}>
          {isInSpellbook ? "In your spellbook" : "Add to your spellbook"}
        </Button>
      ) : (
        <Tooltip label="You need to create character for use spellbook">
          <Button fullWidth mt="md" radius="md" disabled>
            {isInSpellbook ? "In your spellbook" : "Add to your spellbook"}
          </Button>
        </Tooltip>
      )}
    </Card>
  )
}

export default Spell
