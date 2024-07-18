import { Card, CardSection, Container, Grid, Group, Paper, Stack, Text, Title, Tooltip } from "@mantine/core"
import { useCharacter } from "../contexts/CharacterContext"
import { IconCircle, IconCircleFilled } from "@tabler/icons-react"
import { useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import DiceRollModal from "./Modals/DiceRollModal"

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
  const [rollInput, setRollInput] = useState("")
  const [opened, { open, close }] = useDisclosure(false)
  const c = useCharacter().currCharacter

  function handleDiceRoll(input: string) {
    setRollInput(input)
    open()
  }
  if (c) {
    const basicValues = [
      { message: "Class: ", val: c.class },
      { message: "Background: ", val: c.background },
      { message: "Race: ", val: c.race },
      { message: "Alignment: ", val: c.alignment },
      { message: "Level: ", val: c.level },
    ]

    return (
      <>
        <DiceRollModal opened={opened} close={close} input={rollInput} />
        <Container size="lg" mt={100}>
          <Stack>
            <Card withBorder shadow="sm" radius="md">
              <Stack align="center" pb="sm">
                <Title size="h2" fw={900} c="var(--mantine-color-anchor)">
                  {c.name}
                </Title>
              </Stack>
              <Card.Section withBorder inheritPadding py="xs">
                <Grid grow>
                  {basicValues.map((b) => (
                    <Grid.Col span={2} key={b.message}>
                      <Paper withBorder py="xs">
                        <Text style={{ textAlign: "center" }} size="lg">
                          {b.message + b.val}
                        </Text>
                      </Paper>
                    </Grid.Col>
                  ))}
                </Grid>
              </Card.Section>
            </Card>

            <Card withBorder shadow="sm" radius="md">
              <Grid grow>
                {c.attributes.map((a) => (
                  <Grid.Col span={2} key={a.name}>
                    <Stack align="center" gap={0} mb="md">
                      <Text>{a.name.slice(0, 3).toUpperCase()}</Text>
                      <Tooltip label={"+" + a.effect} position="bottom">
                        <Paper withBorder py="lg" px="xl">
                          {a.score}
                        </Paper>
                      </Tooltip>
                    </Stack>
                  </Grid.Col>
                ))}
              </Grid>
            </Card>
            <Card withBorder shadow="sm" radius="md">
              <CardSection withBorder inheritPadding py="xs">
                <Text>Saving Throws</Text>
              </CardSection>
              <Grid mt="xs">
                {c.savingThrows.map((s) => (
                  <Grid.Col span={3} key={s.name}>
                    <Paper p="xs" onClick={() => handleDiceRoll("1d20" + s.score)}>
                      <Group>
                        {s.proficiency ? <IconCircleFilled /> : <IconCircle />}
                        <Text>{camelCaseToNormal(s.name) + ": " + s.score}</Text>
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
                  <Grid.Col span={3} key={s.name}>
                    <Paper p="xs" onClick={() => handleDiceRoll("1d20" + s.score)}>
                      <Group>
                        {s.proficiency ? <IconCircleFilled /> : <IconCircle />}
                        <Text>{camelCaseToNormal(s.name) + ": " + s.score}</Text>
                      </Group>
                    </Paper>
                  </Grid.Col>
                ))}
              </Grid>
            </Card>
          </Stack>
        </Container>
      </>
    )
  } else {
    return
  }
}

export default CharacterSheet
