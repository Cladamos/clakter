import { Group, Loader, Modal, Badge, Text, Tooltip, Popover, PopoverTarget, PopoverDropdown, Stack } from "@mantine/core"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useDisclosure } from "@mantine/hooks"

type SpellModalProps = {
  opened: boolean
  close: () => void
  spellIndex: string
}

type FetchCurrSpellResposeBody = {
  name: string
  desc: string
  range: string
  casting_time: string
  duration: string
  components: string
  material: string
  level: string
  school: {
    name: string
  }
  classes: [
    {
      name: string
    },
  ]
}
const BASE_URL = "https://www.dnd5eapi.co/api/spells"

async function fetchCurrSpell(spellIndex: string) {
  const response = await axios<FetchCurrSpellResposeBody>(`${BASE_URL}/${spellIndex}`)
  return response.data
}

function SpellModal(props: SpellModalProps) {
  const [opened, { close, open }] = useDisclosure(false)
  const query = useQuery({
    queryKey: ["spell", props.spellIndex],
    queryFn: ({ queryKey }) => fetchCurrSpell(queryKey[1]),
  })
  if (query.isLoading || query.isPending) {
    return (
      <Modal opened={props.opened} onClose={props.close} size="lg" padding="xl" radius="md" centered>
        <Group justify="center" h={300} mb="xl" gap="lg">
          <Loader color="blue" size="xl" />
          <Text size="xl"> Loading... </Text>
        </Group>
      </Modal>
    )
  }
  if (query.error) {
    return (
      <Modal opened={props.opened} onClose={props.close} size="lg" padding="xl" radius="md" centered>
        <Text> Opps! Error occured</Text>
      </Modal>
    )
  }

  return (
    <Modal opened={props.opened} onClose={props.close} size="lg" padding="xl" radius="md" centered title={query.data?.name}>
      <Group mb="md" gap="xs" justify="center">
        <Tooltip label="Casting Time" transitionProps={{ transition: "pop", duration: 200 }} position="bottom">
          <Badge variant="dot" color="blue" size="lg">
            {query.data.casting_time}
          </Badge>
        </Tooltip>
        <Popover
          disabled={query.data.material === undefined}
          position="top"
          withArrow
          opened={opened}
          transitionProps={{ transition: "pop", duration: 200 }}
        >
          <PopoverTarget>
            <Tooltip label="Components" transitionProps={{ transition: "pop", duration: 200 }} position="bottom">
              <Badge variant="dot" color="violet" size="lg" onMouseEnter={open} onMouseLeave={close}>
                {query.data.components}
              </Badge>
            </Tooltip>
          </PopoverTarget>
          <PopoverDropdown>
            <Text size="xs">{query.data.material}</Text>
          </PopoverDropdown>
        </Popover>
        <Tooltip label="Range" transitionProps={{ transition: "pop", duration: 200 }} position="bottom">
          <Badge variant="dot" color="grape" size="lg">
            {query.data.range}
          </Badge>
        </Tooltip>
        <Tooltip label="Duration" transitionProps={{ transition: "pop", duration: 200 }} position="bottom">
          <Badge variant="dot" color="red" size="lg">
            {query.data.duration}
          </Badge>
        </Tooltip>
        <Tooltip label="Level" transitionProps={{ transition: "pop", duration: 200 }} position="bottom">
          <Badge variant="dot" color="red" size="lg">
            {query.data.level == "0" ? "Cantrip" : "Level " + query.data.level}
          </Badge>
        </Tooltip>
      </Group>
      <Stack gap="sm">
        <Text size="sm">{query.data.desc}</Text>
        <Group justify="space-between">
          <Text size="sm">School: {query.data.school?.name}</Text>
          <Text size="sm">Classes: {query.data.classes?.map((n) => " " + n.name).toString()}</Text>
        </Group>
      </Stack>
    </Modal>
  )
}
export default SpellModal
