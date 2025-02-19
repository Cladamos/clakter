import { Alert, Text, Button, Modal, Stack, JsonInput } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { Character, useCharacter } from "../../contexts/CharacterContext"
import { notifications } from "@mantine/notifications"
import { v4 as uuidv4 } from "uuid"
import { useTheme } from "../../contexts/ThemeContext"
import { IconInfoCircle } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { FetchAllSpellsResponseBody } from "../Cards"
import axios from "axios"

type ImportModalProps = {
  opened: boolean
  close: () => void
}

async function fetchAllSpels() {
  const response = await axios<FetchAllSpellsResponseBody>("https://www.dnd5eapi.co/api/spells")
  return response.data
}

function ImportCharacterModal(props: ImportModalProps) {
  const [data, setData] = useInputState<string>("")
  const [isHaveCreatedSpells, setIsHaveCreatedSpells] = useState(false)
  const [lostSpells, setLostSpells] = useState<string[]>([])
  const { characters, setCharacters, setCurrCharacter } = useCharacter()
  const [isJsonParseError, setIsJsonParseError] = useState(false)
  const { setThemeColor } = useTheme()

  let character: Character

  const query = useQuery({
    queryKey: ["spells"],
    queryFn: fetchAllSpels,
  })

  useEffect(() => {
    if (data === "") {
      setIsJsonParseError(false)
      return
    }
    try {
      character = JSON.parse(data)
      setIsJsonParseError(false)
      const spells = character.spells.results
        .map((spell) => (query.data?.results.find((s) => s.index === spell.index) ? "" : spell.name))
        .filter((s) => s !== "")
      spells.length > 0 ? setIsHaveCreatedSpells(true) : setIsHaveCreatedSpells(false)

      setLostSpells(spells)
    } catch (e) {
      setIsJsonParseError(true)
    }
  }, [data])

  function handleCreate() {
    character = JSON.parse(data)
    console.log(character)
    setCharacters((c) => [...c, character])
    characters.find((c) => c.id === character.id) ? (character.id = uuidv4()) : character.id
    setCurrCharacter({
      ...character,
      hitPoints: { hpMax: character.hitPoints.hpMax, hp: character.hitPoints.hpMax, thp: character.hitPoints.thp },
    })
    notifications.show({
      title: "Your character is created",
      message: "Have fun with your " + character.class + ". Such a great choice!",
    })
    setData("")
    setThemeColor(character.theme)
    props.close()
  }

  //TODO: Make those views
  if (query.isLoading || query.isPending) {
    return <></>
  }
  if (query.isError) {
    return <></>
  }

  return (
    <Modal opened={props.opened} onClose={props.close} size="md" radius="md" centered padding="xl" title="Paste your character JSON">
      <Stack>
        <JsonInput
          error={isJsonParseError ? "Your JSON is not proper for character input" : null}
          value={data}
          onChange={(val) => setData(val)}
          size="md"
          radius="md"
          autosize
          minRows={5}
          maxRows={5}
          formatOnBlur={true}
        ></JsonInput>
        {isHaveCreatedSpells && (
          <Alert variant="light" radius="md" color="red" title="Unknown Spells" icon={<IconInfoCircle />}>
            <Stack>
              <Text size="sm">
                You don't have those following created spells, if you want to see their description and features you need to create them:
              </Text>
              <Text fw={700}>{lostSpells.toString()}</Text>
            </Stack>
          </Alert>
        )}
        <Button disabled={isJsonParseError} onClick={handleCreate}>
          Create
        </Button>
      </Stack>
    </Modal>
  )
}
export default ImportCharacterModal
