import { IconChevronDown, IconPencil, IconTrash, IconSwitch2, IconPlus } from "@tabler/icons-react"
import { useCharacter } from "../contexts/CharacterContext"
import { Group, Avatar, Text, Menu, rem } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import DeleteCharacterModal from "./Modals/DeleteCharacterModal"
import CreateCharacterModal from "./Modals/CreateCharacterModal"
import SelectCharacterModal from "./Modals/SelectCharacterModal"
import { useState } from "react"
import { notifications } from "@mantine/notifications"

type NavbarAvatarProps = {
  size: string
}

function NavbarAvatar(props: NavbarAvatarProps) {
  const [openedDeleteCharacterModal, { open: openDeleteCharacterModal, close: closeDeleteCharacterModal }] = useDisclosure(false)
  const [openedCreateCharacterModal, { open: openCreateCharacterModal, close: closeCreateCharacterModal }] = useDisclosure(false)
  const [openedSelectCharacterModal, { open: openSelectCharacterModal, close: closeSelectCharacterModal }] = useDisclosure(false)
  const [modalType, setModalType] = useState<"editing" | "creating">("editing")
  const characterCtx = useCharacter()

  function handleModalType(type: "editing" | "creating") {
    setModalType(type)
    openCreateCharacterModal()
  }

  function handleSelectCharacterError() {
    notifications.show({
      title: "You have only one character",
      message: "You can create new characters with using menu",
      color: "red",
    })
  }

  if (characterCtx.currCharacter) {
    return (
      <>
        <CreateCharacterModal opened={openedCreateCharacterModal} close={closeCreateCharacterModal} type={modalType} />
        <DeleteCharacterModal opened={openedDeleteCharacterModal} close={closeDeleteCharacterModal} />
        <SelectCharacterModal opened={openedSelectCharacterModal} close={closeSelectCharacterModal} />
        <Menu withArrow offset={20}>
          <Menu.Target>
            <Group>
              <Avatar size={props.size} alt={characterCtx.currCharacter.name} color="var(--mantine-color-anchor)">
                {characterCtx.currCharacter.name.slice(0, 2).toUpperCase()}
              </Avatar>
              <Text size={props.size}>{characterCtx.currCharacter.name}</Text>
              <IconChevronDown style={{ width: rem(18), height: rem(18) }} />
            </Group>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />} onClick={() => handleModalType("editing")}>
              Edit my character
            </Menu.Item>
            <Menu.Item
              leftSection={<IconSwitch2 style={{ width: rem(14), height: rem(14) }} />}
              onClick={characterCtx.characters.length > 1 ? openSelectCharacterModal : handleSelectCharacterError}
            >
              Change character
            </Menu.Item>
            <Menu.Item leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />} onClick={() => handleModalType("creating")}>
              Create new character
            </Menu.Item>
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
