import { Modal, Stack, Input, Button, Textarea, NativeSelect } from "@mantine/core"
import { useInputState } from "@mantine/hooks"

type CreateSpellModalProps = {
  opened: boolean
  close: () => void
  createSpell: (spell: createdSpell) => void
}

export type createdSpell = {
  name: string
  level: string
  desc: string
}

function CreateSpellModal(props: CreateSpellModalProps) {
  const [name, setName] = useInputState("")
  const [description, setDescription] = useInputState("")
  const [level, setLevel] = useInputState("")

  function handleClick() {
    props.createSpell({ name: name, level: level, desc: description })
    props.close()
  }

  return (
    <Modal opened={props.opened} onClose={props.close} size="lg" padding="lg" radius="md" centered title="Create Your Own Spell">
      <Stack gap="md" justify="center">
        <Input.Wrapper label="Name" required>
          <Input size="md" radius="md" placeholder="Spell Name" onChange={setName} />
        </Input.Wrapper>
        <Input.Wrapper size="md" label="Description">
          <Textarea size="md" radius="md" placeholder="Spell Description" onChange={setDescription} />
        </Input.Wrapper>
        <NativeSelect
          value={level}
          data={["Cantrip", "1 Level", "2 Level", "3 Level", "4 Level", "5 Level", "6 Level", "7 Level", "8 Level", "9 Level"]}
          label="Spell Level"
          component="select"
          size="md"
          radius="md"
          required
          onChange={setLevel}
        />
        <Button radius="md" size="md" onClick={handleClick}>
          Create
        </Button>
      </Stack>
    </Modal>
  )
}
export default CreateSpellModal
