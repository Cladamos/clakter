import axios from "axios";
import Spell from "./Spell";
import { Container, Grid, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

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

  if (query.isLoading || query.isPending) {
    return (
      <Container size="xl">
        <Grid py={100} px="xl">
          {Array.from(Array(24)).map(() => (
            <Grid.Col span={variants.regular}>
              <Skeleton height={250} mt={6} radius="md" />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    );
  }

  if (query.isError) {
    return <p> Error </p>;
  }

  return (
    <Container size="xl">
      <Grid py={100} px="xl">
        {query.data.results.map((spell) => (
          <Grid.Col span={variants.regular}>
            <Spell title={spell.name} desc="" />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

export default Cards;
