import { Button, Group, Modal, NumberInput, Paper, Stack, Text } from "@mantine/core"
import { useCharacter } from "../../contexts/CharacterContext"
import { useInputState } from "@mantine/hooks"

type HpModalProps = {
  opened: boolean
  close: () => void
}

function HpModal(props: HpModalProps) {
  const characterCtx = useCharacter()
  const hitPoints = characterCtx.currCharacter!.hitPoints
  const [thp, setThp] = useInputState<number>(Number(hitPoints.thp))
  const [hp, setHp] = useInputState<number>(Number(hitPoints.hp))

  function handleSetHp() {
    characterCtx.setCurrCharacter((c) => (c ? { ...c, hitPoints: { ...c.hitPoints, hp: hp.toString(), thp: thp.toString() } } : null))
  }

  return (
    <Modal opened={props.opened} onClose={props.close} size="sm" radius="md" centered padding="md" title={"Hit Point Maximum: " + hitPoints.hpMax}>
      <Stack>
        <Paper withBorder p="xs">
          <Group grow>
            <Text>Hp: </Text>
            <NumberInput value={hp} onChange={(val) => setHp(Number(val))} />
            <Text>Thp: </Text>
            <NumberInput value={thp} onChange={(val) => setThp(Number(val))} />
          </Group>
        </Paper>
        <Group grow>
          <Button size="md" variant="outline" onClick={props.close}>
            Close
          </Button>
          <Button
            size="md"
            onClick={() => {
              handleSetHp()
              props.close()
            }}
          >
            Set hit points
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
export default HpModal
