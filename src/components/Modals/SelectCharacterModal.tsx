import { Avatar, Divider, Button, Modal, Stack, Text, Group, ScrollArea } from "@mantine/core"
import { Character, useCharacter } from "../../contexts/CharacterContext"
import { notifications } from "@mantine/notifications"

type selectCharacterModalProps = {
  opened: boolean
  close: () => void
}

function SelectCharacterModal(props: selectCharacterModalProps) {
  const characterCtx = useCharacter()

  function handleSetCharacter(character: Character) {
    characterCtx.setCurrCharacter(character)
    props.close()
    notifications.show({
      title: "Current character is " + character.name,
      message: "Current character succesfuly changed",
    })
  }

  return (
    <Modal onClose={props.close} opened={props.opened} size="sm" radius="md" centered padding="md" title="Select your character">
      <ScrollArea h={300} scrollbars="y">
        <Stack>
          <Divider />
          {characterCtx.characters.map((c) =>
            characterCtx.currCharacter?.id == c.id ? (
              <></>
            ) : (
              <>
                <Button variant="subtle" justify="flex-start" size="lg" key={c.id} onClick={() => handleSetCharacter(c)}>
                  <Group gap="md">
                    <Avatar color="var(--mantine-color-anchor)" alt={c.name}>
                      {c.name.slice(0, 2).toUpperCase()}
                    </Avatar>
                    <Text maw={100} truncate="end">
                      {c.name}
                    </Text>
                  </Group>
                </Button>
                <Divider />
              </>
            ),
          )}
        </Stack>
      </ScrollArea>
    </Modal>
  )
}

export default SelectCharacterModal
