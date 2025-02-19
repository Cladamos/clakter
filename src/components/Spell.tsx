import { Card, Text, Badge, Button, Group, ActionIcon, Tooltip } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"
import { useCharacter } from "../contexts/CharacterContext"
import { notifications } from "@mantine/notifications"
import { useState } from "react"

type Props = {
  title: string
  level: string
  index: string
  handleCurrSpell: (spell: string) => void
}

function Spell(props: Props) {
  const characterCtx = useCharacter()
  const [isInSpellbook, setIsInSpellbook] = useState(
    characterCtx.currCharacter?.spells.results.find((s) => s.index === props.index) === undefined ? false : true,
  )
  const [isDelete, setIsDelete] = useState(false)

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

    if (isInSpellbook) {
      newSpells = characterCtx.currCharacter.spells.results.filter((s) => s.index !== currSpell.index)
      setIsInSpellbook(false)
      setIsDelete(false)
      notifications.show({
        title: "Successful",
        message: "Your spell successfully deleted from your spellbook",
      })
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
      {characterCtx.currCharacter ? (
        isDelete ? (
          <Group grow>
            <Button mt="md" radius="md" variant="outline" onClick={() => setIsDelete(false)}>
              Cancel
            </Button>
            <Button mt="md" radius="md" variant="filled" onClick={handleAdd}>
              Delete
            </Button>
          </Group>
        ) : (
          <Button
            fullWidth
            mt="md"
            radius="md"
            onClick={() => (isInSpellbook ? (isDelete ? handleAdd() : setIsDelete(true)) : handleAdd())}
            variant={isInSpellbook ? "filled" : "outline"}
          >
            {isInSpellbook ? "In your spellbook" : "Add to your spellbook"}
          </Button>
        )
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
