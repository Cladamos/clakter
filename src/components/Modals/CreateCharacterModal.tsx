import { Modal, Stepper, Button, Group, TextInput, Stack, Card, Text, Checkbox, Grid, Container, Tooltip, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconCircleFilled } from "@tabler/icons-react"
import { notifications } from "@mantine/notifications"
import { useState, useEffect, useRef } from "react"
import { Character, useCharacter } from "../../contexts/CharacterContext"
import { v4 as uuidv4 } from "uuid"

type createCharacterModalProps = {
  opened: boolean
  close: () => void
  type: "editing" | "creating"
}

const basics = [
  { label: "Name", placeholder: "Cladamos", key: "name" },
  { label: "Class", placeholder: "Bard", key: "class" },
  { label: "Race", placeholder: "Human", key: "race" },
  { label: "Background", placeholder: "Sailor", key: "background" },
  { label: "Proficiency", placeholder: "+4", key: "proficiency" },
  { label: "Alignment", placeholder: "Evil", key: "alignment" },
  { label: "Level", placeholder: "9 Level", key: "level" },
]

const attributes = [
  { label: "Str", key: "attributes.0.score" },
  { label: "Dex", key: "attributes.1.score" },
  { label: "Con", key: "attributes.2.score" },
  { label: "Int", key: "attributes.3.score" },
  { label: "Wis", key: "attributes.4.score" },
  { label: "Cha", key: "attributes.5.score" },
]

const extraDetails = [
  { label: "Armor Class", placeholder: "22", tooltip: "10 + your dex modifier + armor", key: "ac" },
  { label: "Hit Point", placeholder: "66", tooltip: "Based on your hit dice rolls", key: "hitPoints.hpMax" },
  { label: "Speed", placeholder: "30ft", tooltip: "Based on your race", key: "speed" },
  { label: "Intiative", placeholder: "+3", tooltip: "Your dex modifier", key: "intiative" },
]
const personalDetails = [
  { label: "Personal Trait 1", placeholder: "Nothing can shake my optimistic attitude.", key: "personalTrait1" },
  {
    label: "Personal Trait 2",
    placeholder: "I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me.",
    key: "personalTrait2",
  },
  { label: "Ideals", placeholder: "Freedom. Tyrants must not be allowed to oppress the people.", key: "ideals" },
  { label: "Bonds", placeholder: "I'm trying to pay off an old debt I owe to a generous benefactor.", key: "bonds" },
  { label: "Flaws", placeholder: "I'm never satisfied with what I have--I always want more.", key: "flaws" },
]

const savingThrows = [
  { label: "Str", key: "savingThrows.0.score" },
  { label: "Dex", key: "savingThrows.1.score" },
  { label: "Con", key: "savingThrows.2.score" },
  { label: "Int", key: "savingThrows.3.score" },
  { label: "Wis", key: "savingThrows.4.score" },
  { label: "Cha", key: "savingThrows.5.score" },
]

const skillChecks = [
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
  const characterCtx = useCharacter()

  const [active, setActive] = useState(0)
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current))
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
      id: "",
      name: "",
      class: "",
      race: "",
      background: "",
      proficiency: "",
      alignment: "",
      level: "",
      ac: "",
      hitPoints: { hp: "", thp: "", hpMax: "" },
      speed: "",
      intiative: "",
      attributes: [
        { name: "strength", score: "", effect: 0 },
        { name: "dexterity", score: "", effect: 0 },
        { name: "constitution", score: "", effect: 0 },
        { name: "intelligence", score: "", effect: 0 },
        { name: "wisdom", score: "", effect: 0 },
        { name: "charisma", score: "", effect: 0 },
      ],
      savingThrows: [
        { name: "strength", type: "str", score: "", proficiency: false },
        { name: "dexterity", type: "dex", score: "", proficiency: false },
        { name: "constitution", type: "con", score: "", proficiency: false },
        { name: "intelligence", type: "int", score: "", proficiency: false },
        { name: "wisdom", type: "wis", score: "", proficiency: false },
        { name: "charisma", type: "cha", score: "", proficiency: false },
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
      personalTrait1: "",
      personalTrait2: "",
      ideals: "",
      bonds: "",
      flaws: "",
    },
    validate: validationSchema,
  })

  const initialLoad = useRef(true)

  useEffect(() => {
    if (props.opened && initialLoad.current) {
      if (props.type === "editing" && characterCtx.currCharacter) {
        form.setValues(characterCtx.currCharacter)
      } else if (props.type === "creating") {
        form.reset()
      }
      initialLoad.current = false
    }
  }, [props.opened, props.type, characterCtx.currCharacter, form])

  useEffect(() => {
    if (!props.opened) {
      initialLoad.current = true
    }
  }, [props.opened])

  if (!props.opened) return null

  function handleModalClose() {
    props.close()
    setActive(0)
  }

  function handleSubmit(character: Character) {
    if (props.type == "editing") {
      characterCtx.setCurrCharacter(character)
      characterCtx.setCharacters((c) => [...c.filter((c) => c.id !== character.id), character])
      notifications.show({
        title: "Your character succesfuly edited",
        message: "Have fun with your new changes",
      })
    } else {
      const id = uuidv4()
      characterCtx.setCharacters((c) => [...c, { ...character, id: id }])
      characterCtx.setCurrCharacter({ ...character, id: id })
      form.reset()
      notifications.show({
        title: "Your character is created",
        message: "Have fun with your " + character.class + ". Such a great choice!",
      })
    }
    props.close()
    setActive(0)
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
    const newSavingThrows: { name: string; type: string; score: string; proficiency: boolean }[] = []
    form.getValues().savingThrows.map((s, index) =>
      newSavingThrows.push({
        ...s,
        proficiency: false,
        score:
          form.getValues().attributes[index].effect <= 0
            ? String(form.getValues().attributes[index].effect)
            : "+" + String(form.getValues().attributes[index].effect),
      }),
    )
    form.setValues({ savingThrows: newSavingThrows })

    const newSkillChecks: { name: string; type: string; score: string; proficiency: boolean }[] = []
    form
      .getValues()
      .skillChecks.map((s) =>
        form
          .getValues()
          .attributes.find((a) =>
            a.name.includes(s.type)
              ? newSkillChecks.push({ ...s, proficiency: false, score: a.effect <= 0 ? String(a.effect) : "+" + String(a.effect) })
              : null,
          ),
      )
    form.setValues({ skillChecks: newSkillChecks })
  }

  return (
    <Modal
      opened={props.opened}
      onClose={handleModalClose}
      size="xl"
      padding="lg"
      radius="md"
      centered
      title={props.type == "creating" ? "Create Your Own Character" : "Edit Your Character"}
    >
      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <Stepper active={active} onStepClick={setActive} size="xs" mt="xs">
          <Stepper.Step label="First step" description="Determine basics">
            <Grid>
              {basics.map((b) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={b.key}>
                  <TextInput size="md" radius="md" placeholder={b.placeholder} label={b.label} key={form.key(b.key)} {...form.getInputProps(b.key)} />
                </Grid.Col>
              ))}
            </Grid>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Create Personality">
            <Grid grow>
              {personalDetails.map((p) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }} key={p.key}>
                  <Textarea
                    size="md"
                    radius="md"
                    label={p.label}
                    placeholder={p.placeholder}
                    autosize
                    minRows={3}
                    maxRows={5}
                    key={form.key(p.key)}
                    {...form.getInputProps(p.key)}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Stepper.Step>
          <Stepper.Step label="Third Step" description="Set attributes">
            <Stack gap="md">
              <Grid grow>
                {attributes.map((a) => (
                  <Grid.Col span={{ base: 6, md: 4, lg: 2 }} key={a.key}>
                    <TextInput size="md" radius="md" label={a.label} key={form.key(a.key)} {...form.getInputProps(a.key)} />
                  </Grid.Col>
                ))}
              </Grid>
              <Grid grow>
                {extraDetails.map((e) => (
                  <Grid.Col span={{ base: 6, md: 6, lg: 3 }} key={e.key}>
                    <Tooltip label={e.tooltip}>
                      <TextInput
                        size="md"
                        radius="md"
                        placeholder={e.placeholder}
                        label={e.label}
                        key={form.key(e.key)}
                        {...form.getInputProps(e.key)}
                      />
                    </Tooltip>
                  </Grid.Col>
                ))}
              </Grid>
              <Button size="lg" mb="lg" onClick={calculateEffects}>
                Calculate saving thorws and skill checks
              </Button>
              <Card withBorder shadow="sm" radius="md">
                <Card.Section withBorder inheritPadding py="xs">
                  <Text fw={500}>Saving throws</Text>
                </Card.Section>
                <Grid grow mt="sm">
                  {savingThrows.map((s, index) => (
                    <Grid.Col span={{ base: 6, md: 4, lg: 2 }} key={s.key}>
                      <Group wrap="nowrap">
                        <Checkbox
                          radius="xl"
                          mt="lg"
                          icon={IconCircleFilled}
                          checked={form.getValues().savingThrows[index].proficiency}
                          onChange={() => handleCheckboxChange(s.key, index)}
                        />
                        <TextInput size="md" radius="md" label={s.label} key={form.key(s.key)} {...form.getInputProps(s.key)} />
                      </Group>
                    </Grid.Col>
                  ))}
                </Grid>
              </Card>
            </Stack>
          </Stepper.Step>
          <Stepper.Step label="Final Step" description="Confirm skills">
            <Card withBorder shadow="sm" radius="md">
              <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                  <Text fw={500}>Saving throws</Text>
                </Group>
              </Card.Section>
              <Grid mt="md">
                {skillChecks.map((s, index) => (
                  <Grid.Col span={{ base: 12, md: 4, lg: 3 }} key={s.key}>
                    <Group wrap="nowrap">
                      <Checkbox
                        radius="xl"
                        mt="lg"
                        icon={IconCircleFilled}
                        checked={form.getValues().skillChecks[index].proficiency}
                        onChange={() => handleCheckboxChange(s.key, index)}
                      />
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
                <Text size="xl">
                  {props.type == "creating"
                    ? "Thanks for using Clakter for creating your character. I hope you will like it."
                    : "New changes will override your old character, please confirm your changes."}
                </Text>
                <Button size="lg" type="submit" variant="gradient" gradient={{ from: "grape", to: "cyan", deg: 90 }}>
                  {props.type == "creating" ? "Create" : "Confirm"}
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
