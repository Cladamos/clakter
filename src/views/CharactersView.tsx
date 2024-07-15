import { useContext } from "react"
import { CharacterContext } from "../contexts/CharacterContext"
import { useDisclosure } from "@mantine/hooks"
import Characters from "../components/Characters"
import { HeroText } from "../components/HeroHeader/HeroText"
import CreateCharacterModal from "../components/Modals/CreateCharacterModal"

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
        <Characters />
      </>
    )
  }
}
export default CharactersView
