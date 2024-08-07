import { Button, Group, Modal, Text, Stack } from "@mantine/core"
import { useCharacter } from "../../contexts/CharacterContext"
import { notifications } from "@mantine/notifications"
import { useTheme } from "../../contexts/ThemeContext"

type DeleteCharacterModalProps = {
  opened: boolean
  close: () => void
}

function DeleteCharacterModal(props: DeleteCharacterModalProps) {
  const characterCtx = useCharacter()
  const { setThemeColor } = useTheme()

  function handleDelete() {
    characterCtx.setCharacters((cs) => [...cs.filter((c) => c.id !== characterCtx?.currCharacter?.id)])
    characterCtx.setCurrCharacter(null)
    props.close()
    notifications.show({
      title: "Your character succesfuly deleted",
      message: "Your " + characterCtx.currCharacter?.class + " gone to void D:",
      color: "red",
    })
    setThemeColor("indigo")
  }

  return (
    <Modal opened={props.opened} onClose={props.close} size="sm" radius="md" centered padding="md" title="Delete your character">
      <Stack>
        <Text size="sm">
          Are you sure you want to
          <Text size="sm" c="red" inherit component="span">
            {" "}
            delete{" "}
          </Text>
          your character? This action is destructive and can't be turn back.
        </Text>
        <Group justify="flex-end">
          <Button variant="outline" onClick={props.close}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
export default DeleteCharacterModal
