import { Group, Loader, Modal, Badge, Text, Tooltip, Popover, PopoverTarget, PopoverDropdown, Stack, Alert } from "@mantine/core"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useDisclosure } from "@mantine/hooks"
import { IconExclamationCircle } from "@tabler/icons-react"
import { createdSpell } from "../../contexts/CreatedSpellContext"

type SpellModalProps = {
  opened: boolean
  close: () => void
  spell: createdSpell | string
}

type FetchCurrSpellResposeBody = {
  name: string
  desc: string[]
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
    queryKey: ["spell", typeof props.spell === "string" ? props.spell : ""],
    queryFn: ({ queryKey }) => fetchCurrSpell(queryKey[1]),
    enabled: typeof props.spell === "string",
  })

  const modalData =
    typeof props.spell === "string"
      ? { ...query, data: { ...query.data, school: query.data?.school.name, classes: query.data?.classes.map((n) => " " + n.name).toString() } }
      : { data: props.spell, isLoading: false, isPending: false, error: false }

  if (modalData.isLoading || modalData.isPending) {
    return (
      <Modal opened={props.opened} onClose={props.close} size="lg" padding="xl" radius="md" centered>
        <Group justify="center" h={300} mb="xl" gap="lg">
          <Loader color="blue" size="xl" />
          <Text size="xl"> Loading... </Text>
        </Group>
      </Modal>
    )
  }
  if (modalData.error) {
    return (
      <Modal opened={props.opened} onClose={props.close} size="lg" radius="md" centered>
        <Alert variant="light" color="red" title="Error" icon={<IconExclamationCircle />}>
          There was an error occured.
        </Alert>
      </Modal>
    )
  }

  return (
    <Modal opened={props.opened} onClose={props.close} size="lg" padding="xl" radius="md" centered title={modalData.data?.name}>
      <Group mb="md" gap="xs" justify="center">
        <Tooltip label="Casting Time" transitionProps={{ transition: "pop", duration: 200 }} position="bottom">
          <Badge variant="dot" color="blue" size="lg">
            {modalData.data.casting_time}
          </Badge>
        </Tooltip>
        <Popover
          disabled={modalData.data.material === undefined}
          position="top"
          withArrow
          opened={opened}
          transitionProps={{ transition: "pop", duration: 200 }}
        >
          <PopoverTarget>
            <Tooltip label="Components" transitionProps={{ transition: "pop", duration: 200 }} position="bottom">
              <Badge variant="dot" color="violet" size="lg" onMouseEnter={open} onMouseLeave={close}>
                {modalData.data.components}
              </Badge>
            </Tooltip>
          </PopoverTarget>
          <PopoverDropdown>
            <Text size="xs">{modalData.data.material}</Text>
          </PopoverDropdown>
        </Popover>
        <Tooltip label="Range" transitionProps={{ transition: "pop", duration: 200 }} position="bottom">
          <Badge variant="dot" color="grape" size="lg">
            {modalData.data.range}
          </Badge>
        </Tooltip>
        <Tooltip label="Duration" transitionProps={{ transition: "pop", duration: 200 }} position="bottom">
          <Badge variant="dot" color="red" size="lg">
            {modalData.data.duration}
          </Badge>
        </Tooltip>
        <Tooltip label="Level" transitionProps={{ transition: "pop", duration: 200 }} position="bottom">
          <Badge variant="dot" color="red" size="lg">
            {modalData.data.level == "0" ? "Cantrip" : "Level " + modalData.data.level}
          </Badge>
        </Tooltip>
      </Group>
      <Stack gap="sm">
        <Text style={{ whiteSpace: "pre-wrap" }} size="sm">
          {typeof modalData.data.desc === "string"
            ? modalData.data.desc
            : typeof modalData.data.desc === "undefined"
            ? ""
            : modalData.data.desc.map((line, index) => (
                <span key={index}>
                  {index > 0 && "\n"}
                  {line}
                  <br />
                </span>
              ))}
        </Text>
        <Group justify="space-between">
          <Text size="sm">School: {modalData.data.school}</Text>
          <Text size="sm">Classes: {modalData.data.classes}</Text>
        </Group>
      </Stack>
    </Modal>
  )
}
export default SpellModal
