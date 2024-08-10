import Spell from "./Spell"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Container, Grid, Skeleton, Alert, Input, Group, Pagination, Button, Stack, Popover, MultiSelect, Text, Divider } from "@mantine/core"
import { IconAdjustmentsHorizontal, IconExclamationCircle, IconSearch } from "@tabler/icons-react"
import React, { useState } from "react"
import SpellModal from "./Modals/SpellModal"
import { useDisclosure } from "@mantine/hooks"
import CreateSpellModal from "./Modals/CreateSpellModal"
import { createdSpell, useCreatedSpells } from "../contexts/CreatedSpellContext"

const variants = {
  regular: { base: 12, md: 6, lg: 4 },
}

export type FetchAllSpellsResponseBody = {
  results: {
    index: string
    name: string
    level: string
  }[]
}

async function fetchAllSpels() {
  const response = await axios<FetchAllSpellsResponseBody>("https://www.dnd5eapi.co/api/spells")
  return response.data
}
function Cards() {
  const query = useQuery({
    queryKey: ["spells"],
    queryFn: fetchAllSpels,
  })
  const [input, setInput] = useState("")
  const [currSpell, setCurrSpell] = useState<string | createdSpell>("aid")
  const [openedSpellModal, { open: openSpellModal, close: closeSpellModal }] = useDisclosure(false)
  const [openedCreateSpellModal, { open: openCreateSpellModal, close: closeCreateSpellModal }] = useDisclosure(false)
  const [activePage, setPage] = useState(1)
  const [levelFilter, setLevelFilter] = useState<string[]>([])
  // const [classFilter, setClassFilter] = useState<string[]>([])
  // const [schoolFilter, setSchoolFilter] = useState<string[]>([])
  const cardsPerPage = 12

  const { createdSpells, setCreatedSpells } = useCreatedSpells()

  function handleCreateSpell(spell: createdSpell) {
    setCreatedSpells((spells) => [...spells, spell])
  }

  if (query.isLoading || query.isPending) {
    return (
      <Container size="lg" mt={100}>
        <Group gap="lg" justify="center">
          <Input
            leftSection={<IconSearch size={30} />}
            w="100%"
            radius="sm"
            size="md"
            placeholder="Search for spells"
            value={input}
            onChange={handleChange}
          />
          <Grid w="100%">
            {Array.from(Array(12)).map((_, index) => (
              <Grid.Col span={variants.regular} key={index}>
                <Skeleton height={125} mt={6} radius="md" />
              </Grid.Col>
            ))}
          </Grid>
          <Button w="100%" radius="md" onClick={openCreateSpellModal}>
            Create Your Own Spells
          </Button>
        </Group>
      </Container>
    )
  }

  if (query.isError) {
    return (
      <Container size="lg" mt={100}>
        <Alert variant="light" color="red" title="Error" icon={<IconExclamationCircle />}>
          There was an error occured.
        </Alert>
      </Container>
    )
  }

  const mergedSpells = [
    ...query.data.results,
    ...createdSpells.map((c) => {
      return { index: c.name.toLowerCase(), name: c.name, level: c.level }
    }),
  ]
  const data = mergedSpells.filter((curr) => curr.name.toLowerCase().includes(input.toLowerCase()))
  const filteredData =
    levelFilter.length == 0 ? data : data.filter((d) => levelFilter.some((l) => (l == "Cantrip" ? "0" == d.level : l.slice(0, 1) == d.level)))

  const indexOfLastCard = activePage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value)
    setPage(1)
  }
  function handleCurrSpell(spell: string) {
    let createdSpell = createdSpells.find((c) => c.name.toLowerCase() == spell)
    if (createdSpell !== undefined) {
      setCurrSpell(createdSpell)
    } else {
      setCurrSpell(spell)
    }
    openSpellModal()
  }

  return (
    <>
      <CreateSpellModal opened={openedCreateSpellModal} close={closeCreateSpellModal} createSpell={handleCreateSpell} spells={mergedSpells} />
      <SpellModal opened={openedSpellModal} close={closeSpellModal} spell={currSpell} />
      <Container size="lg" mt={100}>
        <Stack gap="lg" align="center">
          <Group w="100%" justify="center">
            <Input
              style={{ flex: 1 }}
              leftSection={<IconSearch size={30} />}
              rightSectionPointerEvents="all"
              radius="sm"
              size="md"
              placeholder="Search for spells"
              value={input}
              onChange={handleChange}
            />

            <Popover width={300} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button variant="light" size="md" p="xs">
                  <IconAdjustmentsHorizontal />
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack gap="md">
                  <Text size="lg" style={{ textAlign: "center" }}>
                    Filters
                  </Text>
                  <Divider />
                  <MultiSelect
                    label="Filter by level"
                    comboboxProps={{ withinPortal: false }}
                    size="sm"
                    clearable
                    searchable
                    data={["Cantrip", "1 Level", "2 Level", "3 Level", "4 Level", "5 Level", "6 Level", "7 Level", "8 Level", "9 Level"]}
                    value={levelFilter}
                    onChange={setLevelFilter}
                  />
                  {/* <Divider />
                  <MultiSelect
                    label="Filter by class"
                    comboboxProps={{ withinPortal: false }}
                    size="sm"
                    clearable
                    searchable
                    data={["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]}
                    value={classFilter}
                    onChange={setClassFilter}
                  />
                  <Divider />
                  <MultiSelect
                    label="Filter by school"
                    comboboxProps={{ withinPortal: false }}
                    size="sm"
                    clearable
                    searchable
                    data={["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"]}
                    value={schoolFilter}
                    onChange={setSchoolFilter}
                  /> */}
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
          <Grid w="100%">
            {currentCards.map((spell) => (
              <Grid.Col span={variants.regular} key={spell.name}>
                <Spell title={spell.name} desc="" level={spell.level} index={spell.index} handleCurrSpell={handleCurrSpell} />
              </Grid.Col>
            ))}
          </Grid>
          <Button w="100%" radius="md" onClick={openCreateSpellModal}>
            Create Your Own Spells
          </Button>
          <Pagination
            total={Math.ceil(filteredData.length / cardsPerPage)}
            value={activePage}
            onChange={setPage}
            size="sm"
            disabled={filteredData.length < cardsPerPage}
          />
        </Stack>
      </Container>
    </>
  )
}

export default Cards
