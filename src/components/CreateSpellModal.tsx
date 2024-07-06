import { Modal, Stack, Button, Textarea, NativeSelect, Group, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

type CreateSpellModalProps = {
  opened: boolean
  close: () => void
  createSpell: (spell: createdSpell) => void
}

export type createdSpell = {
  name: string
  desc: string
  level: string
  components: string
  castingTime: string
  range: string
  material: string
  duration: string
  school: string
  classes: string
}

function CreateSpellModal(props: CreateSpellModalProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      desc: "",
      level: "2 Level",
      components: "VSM",
      castingTime: "",
      range: "",
      material: "",
      duration: "",
      school: "",
      classes: "",
    },
    validate: {},
  })

  function handleSumbit() {
    props.createSpell(form.getValues())
    props.close()
    form.reset()
  }

  return (
    <Modal opened={props.opened} onClose={props.close} size="lg" padding="lg" radius="md" centered title="Create Your Own Spell">
      <form onSubmit={form.onSubmit(handleSumbit)}>
        <Stack gap="sm">
          <TextInput size="md" radius="md" placeholder="Aid" label="Name" required key={form.key("name")} {...form.getInputProps("name")} />
          <Textarea
            size="md"
            radius="md"
            label="Description"
            placeholder="Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit point maximum and current hit points increase by 5 for the duration."
            autosize
            minRows={3}
            maxRows={5}
            key={form.key("desc")}
            {...form.getInputProps("desc")}
          />
          <Group grow>
            <NativeSelect
              value={form.getValues().level}
              data={["Cantrip", "1 Level", "2 Level", "3 Level", "4 Level", "5 Level", "6 Level", "7 Level", "8 Level", "9 Level"]}
              label="Spell Level"
              component="select"
              size="md"
              radius="md"
              required
              onChange={(event) => form.setFieldValue("level", event.currentTarget.value)}
            />
            <NativeSelect
              value={form.getValues().components}
              data={["V", "S", "M", "VS", "SM", "VM", "VSM"]}
              label="Components"
              component="select"
              size="md"
              radius="md"
              required
              onChange={(event) => form.setFieldValue("components", event.currentTarget.value)}
            />
          </Group>
          <Group grow>
            <TextInput
              size="md"
              radius="md"
              placeholder="1 Action"
              label="Casting Time"
              required
              key={form.key("castingTime")}
              {...form.getInputProps("castingTime")}
            />
            <TextInput size="md" radius="md" placeholder="30 Feet" label="Range" required key={form.key("range")} {...form.getInputProps("range")} />
          </Group>
          <Group grow>
            <TextInput
              size="md"
              radius="md"
              placeholder="A tiny strip of white cloth"
              label="Material"
              required
              key={form.key("material")}
              {...form.getInputProps("material")}
              disabled={!form.getValues().components.includes("M")}
            />
            <TextInput
              size="md"
              radius="md"
              placeholder="8 Hours"
              label="Duration"
              required
              key={form.key("duration")}
              {...form.getInputProps("duration")}
            />
          </Group>
          <Group grow>
            <TextInput size="md" radius="md" placeholder="Abjuration" label="School" key={form.key("school")} {...form.getInputProps("school")} />
            <TextInput
              size="md"
              radius="md"
              placeholder="Cleric, Paladin"
              label="Classes"
              key={form.key("classes")}
              {...form.getInputProps("classes")}
            />
          </Group>
          <Button radius="md" size="md" type="submit" mt="md">
            Create
          </Button>
        </Stack>
      </form>
    </Modal>
  )
}
export default CreateSpellModal
