import { Modal, Stepper, Button, Group, TextInput, Stack, Card, Text, Checkbox, Grid, Container } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconCircleFilled, IconCheck } from "@tabler/icons-react"
import { notifications } from "@mantine/notifications"
import { useState } from "react"

type createCharacterModalProps = {
  opened: boolean
  close: () => void
}

const basicsProps = [
  { label: "Name", placeholder: "Cladamos", key: "name" },
  { label: "Class", placeholder: "Bard", key: "class" },
  { label: "Race", placeholder: "Human", key: "race" },
  { label: "Background", placeholder: "Sailor", key: "background" },
  { label: "Alignment", placeholder: "Evil", key: "alignment" },
  { label: "Level", placeholder: "9 Level", key: "level" },
  { label: "Armor Class", placeholder: "22", key: "armorClass" },
  { label: "Initiative", placeholder: "+3", key: "initiative" },
  { label: "Hit Point", placeholder: "66", key: "hitPoint" },
]

const attributeInputProps = [
  { label: "Str", key: "attributes.strength.score" },
  { label: "Dex", key: "attributes.dexterity.score" },
  { label: "Con", key: "attributes.constitution.score" },
  { label: "Int", key: "attributes.intelligence.score" },
  { label: "Wis", key: "attributes.wisdom.score" },
  { label: "Cha", key: "attributes.charisma.score" },
]

const savingThrowInputProps = [
  { label: "Str", key: "savingThrows.strength" },
  { label: "Dex", key: "savingThrows.dexterity" },
  { label: "Con", key: "savingThrows.constitution" },
  { label: "Int", key: "savingThrows.intelligence" },
  { label: "Wis", key: "savingThrows.wisdom" },
  { label: "Cha", key: "savingThrows.charisma" },
]

const skillCheckInputProps = [
  { label: "Acrobatics", key: "skillChecks.acrobatics.score" },
  { label: "Animal Handling", key: "skillChecks.animalHandling.score" },
  { label: "Arcane", key: "skillChecks.arcane.score" },
  { label: "Athletics", key: "skillChecks.athletics.score" },
  { label: "Deception", key: "skillChecks.deception.score" },
  { label: "History", key: "skillChecks.history.score" },
  { label: "Insight", key: "skillChecks.insight.score" },
  { label: "Intimidation", key: "skillChecks.intimidation.score" },
  { label: "Investigation", key: "skillChecks.investigation.score" },
  { label: "Medicine", key: "skillChecks.medicine.score" },
  { label: "Nature", key: "skillChecks.nature.score" },
  { label: "Perception", key: "skillChecks.perception.score" },
  { label: "Performance", key: "skillChecks.performance.score" },
  { label: "Persuasion", key: "skillChecks.persuasion.score" },
  { label: "Religion", key: "skillChecks.religion.score" },
  { label: "Sleight Of Hand", key: "skillChecks.sleightOfHand.score" },
  { label: "Stealth", key: "skillChecks.stealth.score" },
  { label: "Survival", key: "skillChecks.survival.score" },
]

function CreateCharacterModal(props: createCharacterModalProps) {
  const [active, setActive] = useState(0)
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      class: "",
      race: "",
      background: "",
      alignment: "",
      level: "",
      armorClass: "",
      initiative: "",
      hitPoint: "",
      attributes: {
        strength: { score: "", effect: "+0" },
        dexterity: { score: "", effect: "+0" },
        constitution: { score: "", effect: "+0" },
        intelligence: { score: "", effect: "+0" },
        wisdom: { score: "", effect: "+0" },
        charisma: { score: "", effect: "+0" },
      },
      savingThrows: {
        strength: "+0",
        dexterity: "+0",
        constitution: "+0",
        intelligence: "+0",
        wisdom: "+0",
        charisma: "+0",
      },
      skillChecks: {
        acrobatics: { type: "dex", score: "+0" },
        animalHandling: { type: "wis", score: "+0" },
        arcane: { type: "int", score: "+0" },
        athletics: { type: "str", score: "+0" },
        deception: { type: "cha", score: "+0" },
        history: { type: "int", score: "+0" },
        insight: { type: "wis", score: "+0" },
        intimidation: { type: "cha", score: "+0" },
        investigation: { type: "int", score: "+0" },
        medicine: { type: "wis", score: "+0" },
        nature: { type: "int", score: "+0" },
        perception: { type: "wis", score: "+0" },
        performance: { type: "cha", score: "+0" },
        persuasion: { type: "cha", score: "+0" },
        religion: { type: "int", score: "+0" },
        sleightOfHand: { type: "dex", score: "+0" },
        stealth: { type: "dex", score: "+0" },
        survival: { type: "wis", score: "+0" },
      },
    },
    validate: {},
  })

  function handleModalClose() {
    props.close()
    setActive(0)
  }

  function handleSubmit(className: string) {
    props.close()
    console.log(form.getValues())
    form.reset()
    notifications.show({
      title: "Your character is created",
      message: "Have fun with your " + className + ". Such a great choice!",
    })
  }

  return (
    <Modal opened={props.opened} onClose={handleModalClose} size="xl" padding="lg" radius="md" centered title="Create Your Own Character">
      <form onSubmit={form.onSubmit((val) => handleSubmit(val.class))}>
        <Stepper active={active} onStepClick={setActive} size="sm" mt="xs">
          <Stepper.Step label="First step" description="Determine basics">
            <Grid>
              {basicsProps.map((b) => (
                <Grid.Col span={4} key={b.key}>
                  <TextInput size="md" radius="md" placeholder={b.placeholder} label={b.label} key={form.key(b.key)} {...form.getInputProps(b.key)} />
                </Grid.Col>
              ))}
            </Grid>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Set attributes">
            <Stack gap="md">
              <Group grow mt="md">
                {attributeInputProps.map((a) => (
                  <TextInput size="md" radius="md" label={a.label} key={form.key(a.key)} {...form.getInputProps(a.key)} />
                ))}
              </Group>
              <Card withBorder shadow="sm" radius="md">
                <Card.Section withBorder inheritPadding py="xs">
                  <Group justify="space-between">
                    <Text fw={500}>Saving throws</Text>
                  </Group>
                </Card.Section>
                <Group grow mt="sm">
                  {savingThrowInputProps.map((s) => (
                    <Group wrap="nowrap" key={s.key}>
                      <Checkbox radius="xl" mt="lg" icon={IconCircleFilled} />
                      <TextInput size="md" radius="md" label={s.label} key={form.key(s.key)} {...form.getInputProps(s.key)} />
                    </Group>
                  ))}
                </Group>
              </Card>
            </Stack>
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            <Card withBorder shadow="sm" radius="md">
              <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                  <Text fw={500}>Saving throws</Text>
                </Group>
              </Card.Section>
              <Grid mt="md">
                {skillCheckInputProps.map((s) => (
                  <Grid.Col span={3} key={s.key}>
                    <Group wrap="nowrap">
                      <Checkbox radius="xl" mt="lg" icon={IconCircleFilled} />
                      <TextInput size="sm" radius="md" label={s.label} key={form.key(s.key)} {...form.getInputProps(s.key)} />
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
            </Card>
          </Stepper.Step>
          <Stepper.Completed>
            <Container size="xs" my="lg" p="xl">
              <Stack justify="center">
                <Text size="xl">Thank for using Clakter for creating your character. I hope you will like it.</Text>
                <Button size="lg" type="submit" variant="gradient" gradient={{ from: "grape", to: "cyan", deg: 90 }}>
                  Create
                </Button>
              </Stack>
            </Container>
          </Stepper.Completed>
        </Stepper>
      </form>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next Step</Button>
      </Group>
    </Modal>
  )
}
export default CreateCharacterModal
