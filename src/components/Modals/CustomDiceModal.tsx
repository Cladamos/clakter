import { Modal } from "@mantine/core"

type CustomDiceModalProps = {
  opened: boolean
  close: () => void
}

function CustomDiceModal(props: CustomDiceModalProps) {
  return (
    <Modal opened={props.opened} onClose={props.close} size="lg" padding="lg" radius="md" centered title="Roll Your Custom Dices">
      Coming soon ...
    </Modal>
  )
}
export default CustomDiceModal
