import { Button, Modal, Stack } from "@mantine/core"

type Props = {
  opened: boolean
  close: () => void
  openCreate: () => void
  openCreateFromPresets: () => void
  openImportCharacter: () => void
}

function CreateCharacterSelectorModal(props: Props) {
  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      size="md"
      radius="md"
      centered
      padding="xl"
      title="Which way do you want to create a character?"
    >
      <Stack>
        <Button
          size="md"
          fullWidth
          onClick={() => {
            props.openCreate()
            props.close()
          }}
        >
          Create your own character
        </Button>
        <Button
          variant="light"
          size="md"
          fullWidth
          onClick={() => {
            props.openCreateFromPresets()
            props.close()
          }}
        >
          Create from presets
        </Button>
        <Button
          variant="light"
          size="md"
          fullWidth
          onClick={() => {
            props.openImportCharacter()
            props.close()
          }}
        >
          Import from JSON
        </Button>
      </Stack>
    </Modal>
  )
}
export default CreateCharacterSelectorModal
