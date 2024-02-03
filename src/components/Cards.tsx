import Spell from "./Spell";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Skeleton,
  Alert,
  Input,
  Group,
  Pagination,
} from "@mantine/core";
import { IconExclamationCircle, IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";

const variants = {
  regular: { base: 12, md: 6, lg: 4 },
};

type FetchAllSpellsResponseBody = {
  results: {
    index: string;
    name: "string";
  }[];
};

async function fetchAllSpels() {
  const response = await axios<FetchAllSpellsResponseBody>(
    "https://www.dnd5eapi.co/api/spells"
  );
  return response.data;
}

function Cards() {
  const query = useQuery({
    queryKey: ["spells"],
    queryFn: fetchAllSpels,
  });

  const [input, setInput] = useState("");
  const [activePage, setPage] = useState(1);
  const cardsPerPage = 9;

  if (query.isLoading || query.isPending) {
    return (
      <Container size="xl" mt={165}>
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
            {Array.from(Array(24)).map(() => (
              <Grid.Col span={variants.regular}>
                <Skeleton height={250} mt={6} radius="md" />
              </Grid.Col>
            ))}
          </Grid>
        </Group>
      </Container>
    );
  }

  if (query.isError) {
    const icon = <IconExclamationCircle />;
    return (
      <Container size="xl" mt={100}>
        <Alert variant="light" color="red" title="Error" icon={icon}>
          There was an error occured.
        </Alert>
      </Container>
    );
  }
  const data = query.data.results.filter((curr) =>
    curr.name.toLowerCase().includes(input.toLowerCase())
  );

  const indexOfLastCard = activePage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
    setPage(1);
  }

  return (
    <Container size="lg" mt={100}>
      <Group gap="lg" justify="flex-end">
        <Pagination
          total={data.length / cardsPerPage}
          value={activePage}
          onChange={setPage}
          mt="sm"
          size="md"
          disabled={currentCards.length < cardsPerPage}
        />
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
            <Grid.Col span={variants.regular}>
              <Spell title={spell.name} desc="" />
            </Grid.Col>
          ))}
        </Grid>
      </Group>
    </Container>
  );
}

export default Cards;
