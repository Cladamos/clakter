import { Modal, Paper, Stack, Text } from "@mantine/core"
import { useCharacter } from "../../contexts/CharacterContext"

type PersonalDetailsModalProps = {
  opened: boolean
  close: () => void
}

function PersonalDetailsModal(props: PersonalDetailsModalProps) {
  const curr = useCharacter().currCharacter
  if (curr) {
    const data: { val: string; message: string }[] = [
      { val: curr.personalTrait1, message: "Personal Trait: " },
      { val: curr.personalTrait2, message: "Personal Trait: " },
      { val: curr.ideals, message: "Ideals: " },
      { val: curr.bonds, message: "Bonds: " },
      { val: curr.flaws, message: "Flaws: " },
    ]
    return (
      <Modal opened={props.opened} onClose={props.close} size="lg" padding="lg" radius="md" centered title="Your Personal Details">
        <Stack>
          {data.map((d) => (
            <Paper withBorder py="xs" px="xl">
              <Text>
                <Text inherit fw={700}>
                  {d.message}
                </Text>
                {d.val}
              </Text>
            </Paper>
          ))}
        </Stack>
      </Modal>
    )
  } else return <></>
}
export default PersonalDetailsModal
