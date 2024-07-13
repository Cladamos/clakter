import { IconChevronDown, IconPencil, IconTrash, IconSwitch2 } from "@tabler/icons-react"
import { useCharacter } from "../contexts/CharacterContext"
import { Group, Avatar, Text, Menu, rem } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import DeleteCharacterModal from "./Modals/DeleteCharacterModal"

type NavbarAvatarProps = {
  size: string
}

function NavbarAvatar(props: NavbarAvatarProps) {
  const [openedDeleteCharacterModal, { open: openDeleteCharacterModal, close: closeDeleteCharacterModal }] = useDisclosure(false)
  const characterCtx = useCharacter()
  if (characterCtx.currCharacter) {
    return (
      <>
        <DeleteCharacterModal opened={openedDeleteCharacterModal} close={closeDeleteCharacterModal} />
        <Menu withArrow offset={20}>
          <Menu.Target>
            <Group>
              <Avatar size={props.size} alt={characterCtx.currCharacter.name} color="indigo">
                {characterCtx.currCharacter.name.slice(0, 2).toUpperCase()}
              </Avatar>
              <Text size={props.size}>{characterCtx.currCharacter.name}</Text>
              <IconChevronDown style={{ width: rem(18), height: rem(18) }} />
            </Group>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}>Edit my character</Menu.Item>
            <Menu.Item leftSection={<IconSwitch2 style={{ width: rem(14), height: rem(14) }} />}>Change character</Menu.Item>
            <Menu.Divider />
            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />} onClick={openDeleteCharacterModal}>
              Delete my character
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </>
    )
  } else {
    return <></>
  }
}

export default NavbarAvatar
