import { Modal, Skeleton, Text } from "@mantine/core";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type SpellModalProps = {
    opened: boolean
    close: () => void
    spellIndex: string
}

type FetchCurrSpellResposeBody = {
    name: string
    desc: string
}
const BASE_URL = "https://www.dnd5eapi.co/api/spells"

async function fetchCurrSpell(spellIndex: string) {
    const response = await axios<FetchCurrSpellResposeBody>(
        (`${BASE_URL}/${spellIndex}`)
    );
    return response.data
}

function SpellModal(props: SpellModalProps) {
    const query = useQuery({
        queryKey: ["spell", props.spellIndex],
        queryFn: ({ queryKey }) => fetchCurrSpell(queryKey[1]),
    });
    if (query.isLoading || query.isPending) {
        return
    }
    if (query.error) {
        <Modal opened={props.opened} onClose={props.close} size="lg" padding="lg" radius="md" centered>
            <Text> Opps! Error occured</Text>
        </Modal>
    }
    return (
        <Modal opened={props.opened} onClose={props.close} size="lg" padding="xl" radius="md" centered title={query.data?.name}>
            <Text size="s," pt="sm">{query.data?.desc}</Text>
        </Modal>
    )
}
export default SpellModal