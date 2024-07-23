import { Modal, Stack, Button, Textarea, NativeSelect, Group, TextInput, Grid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"

type CreateSpellModalProps = {
  opened: boolean
  close: () => void
  createSpell: (spell: createdSpell) => void
  spells: {
    index: string
    name: string
    level: string
  }[]
}

export type createdSpell = {
  name: string
  desc: string
  level: string
  components: string
  casting_time: string
  range: string
  material: string
  duration: string
  school: string
  classes: string
}

const basics = [
  { placeholder: "1 Action", label: "Casting Time", key: "casting_time" },
  { placeholder: "30 Feet", label: "Range", key: "range" },
  { placeholder: "A tiny strip of white cloth", label: "Material", key: "material" },
  { placeholder: "8 Hours", label: "Duration", key: "duration" },
  { placeholder: "Abjuration", label: "School", key: "school" },
  { placeholder: "Cleric, Paladin", label: "Classes", key: "classes" },
]

function CreateSpellModal(props: CreateSpellModalProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      desc: "",
      level: "2 Level",
      components: "VSM",
      casting_time: "",
      range: "",
      material: "",
      duration: "",
      school: "",
      classes: "",
    },
    validate: { name: (value) => (props.spells.find((s) => s.name == value) ? "There is a another spell with same name" : null) },
  })

  function handleSumbit(name: string) {
    props.createSpell({ ...form.getValues(), level: findNumber(form.getValues().level) })
    props.close()
    form.reset()
    notifications.show({
      title: "Your spell is created",
      message: "Your " + name + " created succesfuly. It look awesome :D",
    })
  }

  function findNumber(s: string): string {
    let number = ""
    for (let i = 0; i < s.length; i++) {
      if (!isNaN(Number(s[i]))) {
        number += s[i]
      }
    }
    return number == "" ? "0" : number
  }

  return (
    <Modal opened={props.opened} onClose={props.close} size="lg" padding="lg" radius="md" centered title="Create Your Own Spell">
      <form onSubmit={form.onSubmit((val) => handleSumbit(val.name))}>
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
          <Grid grow>
            {basics.map((b) => (
              <Grid.Col span={6} key={b.key}>
                <TextInput
                  size="md"
                  radius="md"
                  placeholder={b.placeholder}
                  label={b.label}
                  required
                  key={form.key(b.key)}
                  {...form.getInputProps(b.key)}
                  disabled={b.key == "material" ? !form.getValues().components.includes("M") : false}
                />
              </Grid.Col>
            ))}
          </Grid>
          <Button radius="md" size="md" type="submit" mt="md">
            Create
          </Button>
        </Stack>
      </form>
    </Modal>
  )
}
export default CreateSpellModal
