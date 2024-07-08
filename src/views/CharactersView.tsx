import { useDisclosure } from "@mantine/hooks"
import Characters from "../components/Characters"
import { HeroText } from "../components/HeroHeader/HeroText"
import CreateCharacterModal from "../components/CreateCharacterModal"

function CharactersView() {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <CreateCharacterModal opened={opened} close={close} />
      <HeroText open={open} />
      <Characters />
    </>
  )
}
export default CharactersView
