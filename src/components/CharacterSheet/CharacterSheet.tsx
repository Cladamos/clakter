import { Button, Card, CardSection, Checkbox, Container, em, Grid, Group, Paper, ScrollArea, Stack, Text, Title, Tooltip } from "@mantine/core"
import { useCharacter } from "../../contexts/CharacterContext"
import { IconCircle, IconCircleFilled, IconEdit, IconFile, IconFlame } from "@tabler/icons-react"
import { useState } from "react"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import DiceRollModal from "../Modals/DiceRollModal"
import "./CharacterSheet.Module..css"
import PersonalDetailsModal from "../Modals/PersonalDetailsModal"
import HpModal from "../Modals/HpModal"
import CreateCharacterModal from "../Modals/CreateCharacterModal"
import Spell from "../Spell"
import SpellModal from "../Modals/SpellModal"
import { createdSpell, useCreatedSpells } from "../../contexts/CreatedSpellContext"

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

//TODO: Fix height issue now it is 600 in scroll area
//TODO: Fix mobile view buttons

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
  const [openedCharacterModal, { open: openCharacterModal, close: closeCharacterModal }] = useDisclosure(false)
  const [openedSpellModal, { open: openSpellModal, close: closeSpellModal }] = useDisclosure(false)
  const [isSpellView, setIsSpellView] = useState(false)
  const [currSpell, setCurrSpell] = useState<createdSpell | string>("aid")
  const c = useCharacter().currCharacter
  const { createdSpells } = useCreatedSpells()

  const isMobile = useMediaQuery(`(max-width: ${em(1200)})`)

  function handleCurrSpell(spell: string) {
    let createdSpell = createdSpells.find((c) => c.name.toLowerCase() == spell)
    if (createdSpell !== undefined) {
      setCurrSpell(createdSpell)
    } else {
      setCurrSpell(spell)
    }
    openSpellModal()
  }
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
      { message: "Class", val: c.class },
      { message: "Background", val: c.background },
      { message: "Race", val: c.race },
      { message: "Alignment", val: c.alignment },
      { message: "Level", val: c.level },
    ]
    const extraValues = [
      { message: "Ac", val: c.ac },
      { message: "Hp", val: Number(c.hitPoints.hp) + Number(c.hitPoints.thp) },
      { message: "Speed", val: c.speed },
      { message: "Intiative", val: c.intiative },
    ]

    return (
      <>
        <CreateCharacterModal opened={openedCharacterModal} close={closeCharacterModal} type="editing" />
        <SpellModal opened={openedSpellModal} close={closeSpellModal} spell={currSpell} />
        <HpModal opened={openedHpModal} close={closeHpModal} key={c.id} />
        <PersonalDetailsModal opened={openedPersonalDetailsModal} close={closePersonalDetailsModal} />
        <DiceRollModal opened={openedDiceRollModal} close={closeDiceRollModal} input={rollInput} />
        <Container size="lg" mt={90}>
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
                          {a.effect >= 0 ? "+" + a.effect : a.effect}
                        </Paper>
                      </Stack>
                    </Grid.Col>
                  ))}
                </Grid>
              </Card>
            )}
            <Stack w={isMobile ? "100%" : "88%"} gap="xs">
              <Card withBorder shadow="sm" radius="md">
                <Group pb="sm" style={{ position: "relative", width: "100%" }}>
                  <Title
                    className="title-hover"
                    style={isMobile ? { width: "100%", textAlign: "start", marginLeft: "auto" } : { width: "100%", textAlign: "center" }}
                    size="h2"
                    fw={900}
                    c="var(--mantine-color-anchor)"
                    onClick={openPersonalDetailsModal}
                  >
                    {c.name}
                  </Title>
                  <Group style={{ position: "absolute", right: 0 }} gap={0}>
                    <Tooltip label={isSpellView ? "Go sheet" : "Go spells"}>
                      <Button variant="transparent" onClick={() => setIsSpellView((s) => !s)}>
                        {isSpellView ? <IconFile /> : <IconFlame />}
                      </Button>
                    </Tooltip>
                    <Tooltip label="Edit">
                      <Button size="xs" variant="transparent" onClick={openCharacterModal}>
                        <IconEdit />
                      </Button>
                    </Tooltip>
                  </Group>
                </Group>
                <Card.Section withBorder inheritPadding py="sm">
                  <Grid grow>
                    {basicValues.map((b) => (
                      <Grid.Col span={{ base: 12, md: 4, lg: 2 }} key={b.message} style={{ textAlign: "center" }}>
                        <Text>{b.message}</Text>
                        <Paper withBorder py="xs">
                          <Text style={{ textAlign: "center" }} size="sm" truncate="end">
                            {b.val}
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
                            {a.effect >= 0 ? "+" + a.effect : a.effect}
                          </Paper>
                        </Stack>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Card>
              ) : (
                <></>
              )}
              {isSpellView ? (
                <Card withBorder shadow="sm" radius="md">
                  <CardSection withBorder inheritPadding py="xs">
                    <Text>Your Spells</Text>
                  </CardSection>
                  <ScrollArea scrollbars="y" mt="sm" h={585}>
                    <Grid>
                      {c.spells.results.map((s) => (
                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }} key={s.index}>
                          <Spell title={s.name} desc="" index={s.index} level={s.level} handleCurrSpell={handleCurrSpell} />
                        </Grid.Col>
                      ))}
                    </Grid>
                  </ScrollArea>
                </Card>
              ) : (
                <>
                  <Card withBorder shadow="sm" radius="md">
                    <Grid grow style={{ textAlign: "center" }}>
                      {extraValues.map((e) => (
                        <Grid.Col span={{ base: 6, md: 2, lg: 2 }} key={e.message}>
                          <Text>{e.message}</Text>
                          <Paper
                            py="xs"
                            px="xl"
                            withBorder
                            onClick={e.message == "Hp" ? openHpModal : undefined}
                            className={e.message == "Hp" ? "paper-hover" : undefined}
                          >
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
                                key={index}
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
                          <Paper
                            p="xs"
                            onClick={() => (s.score == "0" ? handleDiceRoll("1d20") : handleDiceRoll("1d20" + s.score))}
                            className="paper-hover"
                          >
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
                          <Paper
                            p="xs"
                            onClick={() => (s.score == "0" ? handleDiceRoll("1d20") : handleDiceRoll("1d20" + s.score))}
                            className="paper-hover"
                          >
                            <Group>
                              {s.proficiency ? <IconCircleFilled /> : <IconCircle />}
                              <Text size="sm">{camelCaseToNormal(s.name) + ": " + s.score}</Text>
                            </Group>
                          </Paper>
                        </Grid.Col>
                      ))}
                    </Grid>
                  </Card>
                </>
              )}
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
