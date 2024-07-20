import { Card, CardSection, Checkbox, Container, em, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core"
import { useCharacter } from "../../contexts/CharacterContext"
import { IconCircle, IconCircleFilled } from "@tabler/icons-react"
import { useState } from "react"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import DiceRollModal from "../Modals/DiceRollModal"
import "./CharacterSheet.Module..css"
import PersonalDetailsModal from "../Modals/PersonalDetailsModal"
import HpModal from "../Modals/HpModal"

function camelCaseToNormal(input: string): string {
  let output = ""
  for (let i = 0; i < input.length; i++) {
    if (i == 0) {
      output += input[i].toUpperCase()
    } else {
      if (input[i].toUpperCase() == input[i]) {
        output += " "
      }
      output += input[i]
    }
  }
  return output
}

function CharacterSheet() {
  const [deathSaveStates, setDeathSaveStates] = useState([
    { val: false, color: "indigo" },
    { val: false, color: "indigo" },
    { val: false, color: "indigo" },
  ])
  const [rollInput, setRollInput] = useState("")
  const [openedDiceRollModal, { open: openDiceRollModal, close: closeDiceRollModal }] = useDisclosure(false)
  const [openedPersonalDetailsModal, { open: openPersonalDetailsModal, close: closePersonalDetailsModal }] = useDisclosure(false)
  const [openedHpModal, { open: openHpModal, close: closeHpModal }] = useDisclosure(false)
  const c = useCharacter().currCharacter

  const isMobile = useMediaQuery(`(max-width: ${em(1200)})`)

  function handleDiceRoll(input: string) {
    setRollInput(input)
    openDiceRollModal()
  }

  function handleCheckbox(i: number, checkbox: { val: boolean; color: string }) {
    let checkboxValues: { val: boolean; color: string } = { val: false, color: "indigo" }
    if (checkbox.val == false && checkbox.color == "indigo") {
      checkboxValues = { val: true, color: "indigo" }
    }
    if (checkbox.val == true && checkbox.color == "indigo") {
      checkboxValues = { val: true, color: "red" }
    }
    setDeathSaveStates(deathSaveStates.map((d, index) => (index == i ? checkboxValues : d)))
    console.log(checkboxValues)
  }

  if (c) {
    const basicValues = [
      { message: "Class: ", val: c.class },
      { message: "Background: ", val: c.background },
      { message: "Race: ", val: c.race },
      { message: "Alignment: ", val: c.alignment },
      { message: "Level: ", val: c.level },
    ]
    const extraValues = [
      { message: "Ac", val: c.ac },
      { message: "Hp", val: Number(c.hitPoints.hp) + Number(c.hitPoints.thp) },
      { message: "Speed", val: c.speed },
      { message: "Intiative", val: c.intiative },
    ]

    return (
      <>
        <HpModal opened={openedHpModal} close={closeHpModal} />
        <PersonalDetailsModal opened={openedPersonalDetailsModal} close={closePersonalDetailsModal} />
        <DiceRollModal opened={openedDiceRollModal} close={closeDiceRollModal} input={rollInput} />
        <Container size="xl" mt={90}>
          <Group gap="lg">
            {isMobile ? (
              <></>
            ) : (
              <Card withBorder shadow="sm" radius="md" w="10%">
                <Grid>
                  {c.attributes.map((a) => (
                    <Grid.Col span={12} key={a.name}>
                      <Stack align="center" gap={0}>
                        <Text>{a.name.slice(0, 3).toUpperCase()}</Text>
                        <Paper withBorder py="lg" px="xl">
                          {a.score}
                        </Paper>
                        <Paper withBorder px="xl" radius="xl">
                          {"+" + a.effect}
                        </Paper>
                      </Stack>
                    </Grid.Col>
                  ))}
                </Grid>
              </Card>
            )}
            <Stack w={isMobile ? "100%" : "88%"}>
              <Card withBorder shadow="sm" radius="md">
                <Stack align="center" pb="sm">
                  <Title className="title-hover" size="h2" fw={900} c="var(--mantine-color-anchor)" onClick={openPersonalDetailsModal}>
                    {c.name}
                  </Title>
                </Stack>
                <Card.Section withBorder inheritPadding py="sm">
                  <Grid grow>
                    {basicValues.map((b) => (
                      <Grid.Col span={{ base: 12, md: 4, lg: 2 }} key={b.message}>
                        <Paper withBorder py="xs">
                          <Text style={{ textAlign: "center" }} size="md">
                            {b.message + b.val}
                          </Text>
                        </Paper>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Card.Section>
              </Card>
              {isMobile ? (
                <Card withBorder shadow="sm" radius="md">
                  <Grid>
                    {c.attributes.map((a) => (
                      <Grid.Col span={{ base: 6, md: 4, lg: 2 }} key={a.name}>
                        <Stack align="center" gap={0}>
                          <Text>{a.name.slice(0, 3).toUpperCase()}</Text>
                          <Paper withBorder py="lg" px="xl">
                            {a.score}
                          </Paper>
                          <Paper withBorder px="xl" radius="xl">
                            {"+" + a.effect}
                          </Paper>
                        </Stack>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Card>
              ) : (
                <></>
              )}
              <Card withBorder shadow="sm" radius="md">
                <Grid grow style={{ textAlign: "center" }}>
                  {extraValues.map((e) => (
                    <Grid.Col span={{ base: 6, md: 2, lg: 2 }} key={e.message}>
                      <Text>{e.message}</Text>
                      <Paper py="xs" px="xl" withBorder onClick={e.message == "Hp" ? openHpModal : undefined}>
                        {e.val}
                      </Paper>
                    </Grid.Col>
                  ))}
                  <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
                    <Text> Death Saves</Text>
                    <Paper py="xs" px="xl" withBorder>
                      <Group justify="center">
                        {deathSaveStates.map((c, index) => (
                          <Checkbox
                            size="md"
                            radius="xl"
                            color={c.color}
                            checked={c.val}
                            icon={IconCircleFilled}
                            onChange={() => handleCheckbox(index, c)}
                          />
                        ))}
                      </Group>
                    </Paper>
                  </Grid.Col>
                </Grid>
              </Card>

              <Card withBorder shadow="sm" radius="md">
                <CardSection withBorder inheritPadding py="xs">
                  <Text>Saving Throws</Text>
                </CardSection>
                <Grid mt="xs">
                  {c.savingThrows.map((s) => (
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={s.name}>
                      <Paper p="xs" onClick={() => handleDiceRoll("1d20" + s.score)} className="paper-hover">
                        <Group>
                          {s.proficiency ? <IconCircleFilled /> : <IconCircle />}
                          <Text size="sm">{camelCaseToNormal(s.name) + ": " + s.score}</Text>
                        </Group>
                      </Paper>
                    </Grid.Col>
                  ))}
                </Grid>
              </Card>
              <Card withBorder shadow="sm" radius="md">
                <CardSection withBorder inheritPadding py="xs">
                  <Text>Skills</Text>
                </CardSection>
                <Grid mt="xs">
                  {c.skillChecks.map((s) => (
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={s.name}>
                      <Paper p="xs" onClick={() => handleDiceRoll("1d20" + s.score)} className="paper-hover">
                        <Group>
                          {s.proficiency ? <IconCircleFilled /> : <IconCircle />}
                          <Text size="sm">{camelCaseToNormal(s.name) + ": " + s.score}</Text>
                        </Group>
                      </Paper>
                    </Grid.Col>
                  ))}
                </Grid>
              </Card>
            </Stack>
          </Group>
        </Container>
      </>
    )
  } else {
    return
  }
}

export default CharacterSheet
