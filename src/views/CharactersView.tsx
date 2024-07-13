import { useContext } from "react"
import { CharacterContext } from "../contexts/CharacterContext"
import { useDisclosure } from "@mantine/hooks"
import Characters from "../components/Characters"
import { HeroText } from "../components/HeroHeader/HeroText"
import CreateCharacterModal from "../components/CreateCharacterModal"

function CharactersView() {
  const characterCtx = useContext(CharacterContext)
  const [opened, { open, close }] = useDisclosure(false)
  if (characterCtx?.currCharacter == null) {
    return (
      <>
        <CreateCharacterModal opened={opened} close={close} />
        <HeroText open={open} />
      </>
    )
  } else {
    return (
      <>
        <CreateCharacterModal opened={opened} close={close} />
        <Characters />
      </>
    )
  }
}
export default CharactersView
