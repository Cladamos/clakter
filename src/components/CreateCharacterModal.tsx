import { Modal, Stepper, Button, Group, TextInput, Stack, Card, Text, Checkbox, Grid, Container } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconCircleFilled } from "@tabler/icons-react"
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
  { label: "Proficiency", placeholder: "+4", key: "proficiency" },
  { label: "Alignment", placeholder: "Evil", key: "alignment" },
  { label: "Level", placeholder: "9 Level", key: "level" },
]

const attributeInputProps = [
  { label: "Str", key: "attributes.0.score" },
  { label: "Dex", key: "attributes.1.score" },
  { label: "Con", key: "attributes.2.score" },
  { label: "Int", key: "attributes.3.score" },
  { label: "Wis", key: "attributes.4.score" },
  { label: "Cha", key: "attributes.5.score" },
]

const savingThrowInputProps = [
  { label: "Str", key: "savingThrows.0.score" },
  { label: "Dex", key: "savingThrows.1.score" },
  { label: "Con", key: "savingThrows.2.score" },
  { label: "Int", key: "savingThrows.3.score" },
  { label: "Wis", key: "savingThrows.4.score" },
  { label: "Cha", key: "savingThrows.5.score" },
]

const skillCheckInputProps = [
  { label: "Acrobatics", key: "skillChecks.0.score" },
  { label: "Animal Handling", key: "skillChecks.1.score" },
  { label: "Arcane", key: "skillChecks.2.score" },
  { label: "Athletics", key: "skillChecks.3.score" },
  { label: "Deception", key: "skillChecks.4.score" },
  { label: "History", key: "skillChecks.5.score" },
  { label: "Insight", key: "skillChecks.6.score" },
  { label: "Intimidation", key: "skillChecks.7.score" },
  { label: "Investigation", key: "skillChecks.8.score" },
  { label: "Medicine", key: "skillChecks.9.score" },
  { label: "Nature", key: "skillChecks.10.score" },
  { label: "Perception", key: "skillChecks.11.score" },
  { label: "Performance", key: "skillChecks.12.score" },
  { label: "Persuasion", key: "skillChecks.13.score" },
  { label: "Religion", key: "skillChecks.14.score" },
  { label: "Sleight Of Hand", key: "skillChecks.15.score" },
  { label: "Stealth", key: "skillChecks.16.score" },
  { label: "Survival", key: "skillChecks.17.score" },
]

function CreateCharacterModal(props: createCharacterModalProps) {
  const [active, setActive] = useState(0)
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  const isNotEmpty = (message: string) => (value: string) => value.trim() === "" ? message : null

  // required fields that return error message when not filled
  const fields = ["name", "class", "race", "background", "proficiency"]

  const validationSchema = fields.reduce((acc, field) => {
    acc[field] = isNotEmpty(`Please fill ${field} field`)
    return acc
  }, {} as { [key: string]: (value: string) => string | null })

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      class: "",
      race: "",
      background: "",
      proficiency: "",
      alignment: "",
      level: "",
      attributes: [
        { name: "strength", score: "", effect: 0 },
        { name: "dexterity", score: "", effect: 0 },
        { name: "constitution", score: "", effect: 0 },
        { name: "intelligence", score: "", effect: 0 },
        { name: "wisdom", score: "", effect: 0 },
        { name: "charisma", score: "", effect: 0 },
      ],
      savingThrows: [
        { type: "str", score: "", proficiency: false },
        { type: "dex", score: "", proficiency: false },
        { type: "con", score: "", proficiency: false },
        { type: "int", score: "", proficiency: false },
        { type: "wis", score: "", proficiency: false },
        { type: "cha", score: "", proficiency: false },
      ],
      skillChecks: [
        { name: "acrobatics", type: "dex", score: "", proficiency: false },
        { name: "animalHandling", type: "wis", score: "", proficiency: false },
        { name: "arcane", type: "int", score: "", proficiency: false },
        { name: "athletics", type: "str", score: "", proficiency: false },
        { name: "deception", type: "cha", score: "", proficiency: false },
        { name: "history", type: "int", score: "", proficiency: false },
        { name: "insight", type: "wis", score: "", proficiency: false },
        { name: "intimidation", type: "cha", score: "", proficiency: false },
        { name: "investigation", type: "int", score: "", proficiency: false },
        { name: "medicine", type: "wis", score: "", proficiency: false },
        { name: "nature", type: "int", score: "", proficiency: false },
        { name: "perception", type: "wis", score: "", proficiency: false },
        { name: "performance", type: "cha", score: "", proficiency: false },
        { name: "persuasion", type: "cha", score: "", proficiency: false },
        { name: "religion", type: "int", score: "", proficiency: false },
        { name: "sleightOfHand", type: "dex", score: "", proficiency: false },
        { name: "stealth", type: "dex", score: "", proficiency: false },
        { name: "survival", type: "wis", score: "", proficiency: false },
      ],
    },
    validate: validationSchema,
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

  function handleError() {
    setActive(0)
  }

  function handleCheckboxChange(key: string, index: number) {
    if (key.includes("savingThrows")) {
      const newSavingThrows = [...form.getValues().savingThrows]
      if (newSavingThrows[index].proficiency == false) {
        const scoreVal = Number(newSavingThrows[index].score) + Number(form.getValues().proficiency)
        newSavingThrows[index] = {
          ...newSavingThrows[index],
          score: scoreVal <= 0 ? String(scoreVal) : "+" + String(scoreVal),
        }
      } else {
        const scoreVal = Number(newSavingThrows[index].score) - Number(form.getValues().proficiency)
        newSavingThrows[index] = {
          ...newSavingThrows[index],
          score: scoreVal <= 0 ? String(scoreVal) : "+" + String(scoreVal),
        }
      }
      newSavingThrows[index] = { ...newSavingThrows[index], proficiency: !newSavingThrows[index].proficiency }
      form.setValues({ savingThrows: newSavingThrows })
    } else {
      const newSkillChecks = [...form.getValues().skillChecks]
      if (newSkillChecks[index].proficiency == false) {
        const scoreVal = Number(newSkillChecks[index].score) + Number(form.getValues().proficiency)
        newSkillChecks[index] = {
          ...newSkillChecks[index],
          score: scoreVal <= 0 ? String(scoreVal) : "+" + String(scoreVal),
        }
      } else {
        const scoreVal = Number(newSkillChecks[index].score) - Number(form.getValues().proficiency)
        newSkillChecks[index] = {
          ...newSkillChecks[index],
          score: scoreVal <= 0 ? String(scoreVal) : "+" + String(scoreVal),
        }
      }
      newSkillChecks[index] = { ...newSkillChecks[index], proficiency: !newSkillChecks[index].proficiency }
      form.setValues({ skillChecks: newSkillChecks })
    }
  }

  function calculateEffects() {
    let newAttributes: { name: string; score: string; effect: number }[] = []
    form.getValues().attributes.map((a) => newAttributes.push({ ...a, effect: ~~((Number(a.score) - 10) / 2) })) // "~~" is bitwise operator to truncate I don't want to import math
    form.setValues({ attributes: newAttributes })
    calculateSkills()
  }

  function calculateSkills() {
    const newSavingThrows: { type: string; score: string; proficiency: boolean }[] = []
    form.getValues().savingThrows.map((s, index) =>
      newSavingThrows.push({
        ...s,
        proficiency: false,
        score: form.getValues().attributes[index].effect <= 0 ? String(form.getValues().attributes[index].effect) : "+" + String(form.getValues().attributes[index].effect),
      }),
    )
    form.setValues({ savingThrows: newSavingThrows })

    const newSkillChecks: { name: string; type: string; score: string; proficiency: boolean }[] = []
    form
      .getValues()
      .skillChecks.map((s) =>
        form.getValues().attributes.find((a) => (a.name.includes(s.type) ? newSkillChecks.push({ ...s, proficiency: false, score: a.effect <= 0 ? String(a.effect) : "+" + String(a.effect) }) : null)),
      )
    form.setValues({ skillChecks: newSkillChecks })
  }

  return (
    <Modal opened={props.opened} onClose={handleModalClose} size="xl" padding="lg" radius="md" centered title="Create Your Own Character">
      <form onSubmit={form.onSubmit((val) => handleSubmit(val.class), handleError)}>
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
              <Button size="lg" mb="lg" onClick={calculateEffects}>
                Calculate saving thorws and skill checks
              </Button>
              <Card withBorder shadow="sm" radius="md">
                <Card.Section withBorder inheritPadding py="xs">
                  <Group justify="space-between">
                    <Text fw={500}>Saving throws</Text>
                  </Group>
                </Card.Section>
                <Group grow mt="sm">
                  {savingThrowInputProps.map((s, index) => (
                    <Group wrap="nowrap" key={s.key}>
                      <Checkbox radius="xl" mt="lg" icon={IconCircleFilled} checked={form.getValues().savingThrows[index].proficiency} onChange={() => handleCheckboxChange(s.key, index)} />
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
                {skillCheckInputProps.map((s, index) => (
                  <Grid.Col span={3} key={s.key}>
                    <Group wrap="nowrap">
                      <Checkbox radius="xl" mt="lg" icon={IconCircleFilled} checked={form.getValues().skillChecks[index].proficiency} onChange={() => handleCheckboxChange(s.key, index)} />
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
