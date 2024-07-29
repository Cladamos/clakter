import { Avatar, Divider, Button, Modal, Stack, Text, Group, ScrollArea } from "@mantine/core"
import { Character, useCharacter } from "../../contexts/CharacterContext"
import { notifications } from "@mantine/notifications"
import { useTheme } from "../../contexts/ThemeContext"

type selectCharacterModalProps = {
  opened: boolean
  close: () => void
}

function SelectCharacterModal(props: selectCharacterModalProps) {
  const characterCtx = useCharacter()
  const { setThemeColor } = useTheme()

  function handleSetCharacter(character: Character) {
    characterCtx.setCurrCharacter(character)
    props.close()
    notifications.show({
      title: "Current character is " + character.name,
      message: "Current character succesfuly changed",
    })
    setThemeColor(character.theme)
  }

  return (
    <Modal onClose={props.close} opened={props.opened} size="sm" radius="md" centered padding="md" title="Select your character">
      <ScrollArea h={300} scrollbars="y">
        <Stack>
          <Divider />
          {characterCtx.characters.map((c) => {
            if (characterCtx.currCharacter?.id !== c.id) {
              return (
                <Stack key={c.id}>
                  <Button fullWidth variant="subtle" justify="flex-start" size="lg" key={c.id} onClick={() => handleSetCharacter(c)} color={c.theme}>
                    <Group gap="md">
                      <Avatar color={c.theme} alt={c.name}>
                        {c.name.slice(0, 2).toUpperCase()}
                      </Avatar>
                      <Text maw={100} c={c.theme} truncate="end">
                        {c.name}
                      </Text>
                    </Group>
                  </Button>
                  <Divider />
                </Stack>
              )
            }
          })}
        </Stack>
      </ScrollArea>
    </Modal>
  )
}

export default SelectCharacterModal
