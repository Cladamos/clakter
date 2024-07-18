import { useContext } from "react"
import { CharacterContext } from "../contexts/CharacterContext"
import { useDisclosure } from "@mantine/hooks"
import { HeroText } from "../components/HeroHeader/HeroText"
import CreateCharacterModal from "../components/Modals/CreateCharacterModal"
import CharacterSheet from "../components/CharacterSheet"

function CharactersView() {
  const characterCtx = useContext(CharacterContext)
  const [opened, { open, close }] = useDisclosure(false)
  if (characterCtx?.currCharacter == null) {
    return (
      <>
        <CreateCharacterModal type="creating" opened={opened} close={close} />
        <HeroText open={open} />
      </>
    )
  } else {
    return (
      <>
        <CreateCharacterModal type="creating" opened={opened} close={close} />
        <CharacterSheet />
      </>
    )
  }
}
export default CharactersView
