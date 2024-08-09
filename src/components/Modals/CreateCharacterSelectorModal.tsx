import { Button, Modal, Stack } from "@mantine/core"

type Props = {
  opened: boolean
  close: () => void
  openCreate: () => void
  openCreateFromPresets: () => void
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
      transitionProps={{ duration: 400 }}
    >
      <Stack>
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
          size="md"
          fullWidth
          onClick={() => {
            props.openCreate()
            props.close()
          }}
        >
          Create your own character
        </Button>
      </Stack>
    </Modal>
  )
}
export default CreateCharacterSelectorModal
