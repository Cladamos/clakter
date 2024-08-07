import Spell from "./Spell"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Container, Grid, Skeleton, Alert, Input, Group, Pagination, Button } from "@mantine/core"
import { IconExclamationCircle, IconSearch } from "@tabler/icons-react"
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

  const indexOfLastCard = activePage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard)

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
            total={data.length / cardsPerPage}
            value={activePage}
            onChange={setPage}
            size="md"
            disabled={currentCards.length < cardsPerPage}
          />
        </Group>
      </Container>
    </>
  )
}

export default Cards
