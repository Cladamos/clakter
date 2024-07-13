import { useCharacter } from "../contexts/CharacterContext"
import { Group, Avatar, Text } from "@mantine/core"

type NavbarAvatarProps = {
  size: string
}

function NavbarAvatar(props: NavbarAvatarProps) {
  const characterCtx = useCharacter()
  if (characterCtx.currCharacter) {
    return (
      <Group>
        <Avatar size={props.size} alt={characterCtx.currCharacter.name} color="indigo">
          {characterCtx.currCharacter.name.slice(0, 2).toUpperCase()}
        </Avatar>
        <Text size={props.size} mr="lg">
          {characterCtx.currCharacter.name}
        </Text>
      </Group>
    )
  } else {
    return <></>
  }
}

export default NavbarAvatar
