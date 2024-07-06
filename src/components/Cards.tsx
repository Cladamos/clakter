import Spell from "./Spell"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Container, Grid, Skeleton, Alert, Input, Group, Pagination, Button } from "@mantine/core"
import { IconExclamationCircle, IconSearch } from "@tabler/icons-react"
import React, { useState } from "react"
import SpellModal from "./SpellModal"
import { useDisclosure } from "@mantine/hooks"
import CreateSpellModal from "./CreateSpellModal"
import { createdSpell } from "./CreateSpellModal"

const variants = {
  regular: { base: 12, md: 6, lg: 4 },
}

type FetchAllSpellsResponseBody = {
  results: {
    index: string
    name: "string"
    level: "string"
  }[]
}

const spells: createdSpell[] = [
  {
    name: "Test",
    desc: "test123",
    level: "2 Level",
    components: "VSM",
    castingTime: "321",
    range: "123",
    material: "elma ve 1 kilo muz",
    duration: "3",
    school: "test",
    classes: "uyyy",
  },
]

async function fetchAllSpels() {
  const response = await axios<FetchAllSpellsResponseBody>("https://www.dnd5eapi.co/api/spells")
  return response.data
}
function Cards() {
  const query = useQuery({
    queryKey: ["spells"],
    queryFn: fetchAllSpels,
  })

  const [createdSpells, setCreatedSpells] = useState(spells)
  const [input, setInput] = useState("")
  const [currSpell, setCurrSpell] = useState("")
  const [openedSpellModal, { open: openSpellModal, close: closeSpellModal }] = useDisclosure(false)
  const [openedCreateSpellModal, { open: openCreateSpellModal, close: closeCreateSpellModal }] = useDisclosure(false)
  const [activePage, setPage] = useState(1)
  const cardsPerPage = 12

  function handleCreateSpell(spell: createdSpell) {
    setCreatedSpells([...createdSpells, spell])
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
            {Array.from(Array(12)).map(() => (
              <Grid.Col span={variants.regular}>
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
    const icon = <IconExclamationCircle />
    return (
      <Container size="lg" mt={100}>
        <Alert variant="light" color="red" title="Error" icon={icon}>
          There was an error occured.
        </Alert>
      </Container>
    )
  }

  const data = query.data.results.filter((curr) => curr.name.toLowerCase().includes(input.toLowerCase()))

  const indexOfLastCard = activePage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value)
    setPage(1)
  }
  function handleCurrSpell(index: string) {
    setCurrSpell(index)
    openSpellModal()
  }

  return (
    <>
      <CreateSpellModal opened={openedCreateSpellModal} close={closeCreateSpellModal} createSpell={handleCreateSpell} />
      <SpellModal opened={openedSpellModal} close={closeSpellModal} spellIndex={currSpell} />
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
          <Grid>
            {currentCards.map((spell) => (
              <Grid.Col span={variants.regular}>
                <Spell title={spell.name} desc="" level={"Level " + spell.level} index={spell.index} handleCurrSpell={handleCurrSpell} />
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
