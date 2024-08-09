import { Button, Divider, Modal, ScrollArea, Stack } from "@mantine/core"
import { useCharacter } from "../../../contexts/CharacterContext"
import { useTheme } from "../../../contexts/ThemeContext"
import characterPresets from "./characterPreset.json"

type Props = {
  opened: boolean
  close: () => void
}

function CreateFromPresetsModal(props: Props) {
  const characterCtx = useCharacter()
  const { setThemeColor } = useTheme()
  function handleSelectPreset(id: string) {
    const currentPreset = characterPresets.find((c) => c.id === id)!
    characterCtx.setCurrCharacter(currentPreset)
    characterCtx.setCharacters((c) => [...c, currentPreset])
    setThemeColor(currentPreset.theme)
    props.close()
  }
  return (
    <Modal onClose={props.close} opened={props.opened} size="sm" radius="md" centered padding="md" title="Select from presets">
      <ScrollArea h={300} scrollbars="y">
        <Stack>
          <Divider />
          {characterPresets.map((c) => (
            <Stack key={c.id}>
              <Button fullWidth variant="subtle" justify="flex-start" size="md" key={c.id} color={c.theme} onClick={() => handleSelectPreset(c.id)}>
                {c.class + "/" + c.race + "/" + c.level}
              </Button>
              <Divider />
            </Stack>
          ))}
        </Stack>
      </ScrollArea>
    </Modal>
  )
}
export default CreateFromPresetsModal
