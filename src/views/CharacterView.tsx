import { useContext } from "react"
import { CharacterContext } from "../contexts/CharacterContext"
import { useDisclosure } from "@mantine/hooks"
import { HeroText } from "../components/HeroHeader/HeroText"
import CreateCharacterModal from "../components/Modals/CreateCharacterModal"
import CharacterSheet from "../components/CharacterSheet/CharacterSheet"
import CreateCharacterSelectorModal from "../components/Modals/CreateCharacterSelectorModal"
import CreateFromPresetsModal from "../components/Modals/CreateFromPresetsModal"

function CharactersView() {
  const characterCtx = useContext(CharacterContext)
  const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false)
  const [openedCreateFromPresets, { open: openCreateFromPresets, close: closeCreateFromPresets }] = useDisclosure(false)
  const [openedSelector, { open: openSelector, close: closeSelector }] = useDisclosure(false)
  if (characterCtx?.currCharacter == null) {
    return (
      <>
        <CreateCharacterSelectorModal
          opened={openedSelector}
          close={closeSelector}
          openCreate={openCreate}
          openCreateFromPresets={openCreateFromPresets}
        />
        <CreateCharacterModal type="creating" opened={openedCreate} close={closeCreate} />
        <CreateFromPresetsModal opened={openedCreateFromPresets} close={closeCreateFromPresets} />
        <HeroText open={openSelector} />
      </>
    )
  } else {
    return (
      <>
        <CreateCharacterModal type="creating" opened={openedCreate} close={close} />
        <CharacterSheet />
      </>
    )
  }
}
export default CharactersView
