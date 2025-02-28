import { IconChevronDown, IconPencil, IconTrash, IconSwitch2, IconPlus, IconFileArrowRight } from "@tabler/icons-react"
import { Group, Avatar, Text, Menu, rem } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"
import { notifications } from "@mantine/notifications"
import { useCharacter } from "../../contexts/CharacterContext"
import CreateCharacterModal from "../Modals/CreateCharacterModal"
import DeleteCharacterModal from "../Modals/DeleteCharacterModal"
import SelectCharacterModal from "../Modals/SelectCharacterModal"
import CreateFromPresetsModal from "../Modals/PresetModal/CreateFromPresetsModal"
import CreateCharacterSelectorModal from "../Modals/CreateCharacterSelectorModal"
import { useCopyToClipboard } from "usehooks-ts"
import ImportCharacterModal from "../Modals/ImportCharacterModal"

type NavbarAvatarProps = {
  size: string
}

function NavbarAvatar(props: NavbarAvatarProps) {
  const [openedDeleteCharacterModal, { open: openDeleteCharacterModal, close: closeDeleteCharacterModal }] = useDisclosure(false)
  const [openedCreateCharacterModal, { open: openCreateCharacterModal, close: closeCreateCharacterModal }] = useDisclosure(false)
  const [openedSelectCharacterModal, { open: openSelectCharacterModal, close: closeSelectCharacterModal }] = useDisclosure(false)
  const [openedCreateSelector, { open: openCreateSelector, close: closeCreateSelector }] = useDisclosure(false)
  const [openedCreateFromPreset, { open: openCreateFromPreset, close: closeCreateFromPreset }] = useDisclosure(false)
  const [openedImportCharacter, { open: openImportCharacter, close: closeImportCharacter }] = useDisclosure(false)
  const [modalType, setModalType] = useState<"editing" | "creating">("editing")
  const [_, copy] = useCopyToClipboard()
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

  function handleExportCharacter() {
    copy(JSON.stringify(characterCtx.currCharacter)).then(() =>
      notifications.show({
        title: "Character copied",
        message: "Your character successfully copied to clipboard",
      }),
    )
  }

  if (characterCtx.currCharacter) {
    return (
      <>
        <CreateCharacterSelectorModal
          opened={openedCreateSelector}
          close={closeCreateSelector}
          openCreate={openCreateCharacterModal}
          openCreateFromPresets={openCreateFromPreset}
          openImportCharacter={openImportCharacter}
        />
        <CreateCharacterModal opened={openedCreateCharacterModal} close={closeCreateCharacterModal} type={modalType} />
        <CreateFromPresetsModal opened={openedCreateFromPreset} close={closeCreateFromPreset} />
        <ImportCharacterModal opened={openedImportCharacter} close={closeImportCharacter} />
        <DeleteCharacterModal opened={openedDeleteCharacterModal} close={closeDeleteCharacterModal} />
        <SelectCharacterModal opened={openedSelectCharacterModal} close={closeSelectCharacterModal} />
        <Menu withArrow offset={20} position="bottom-start">
          <Menu.Target>
            <Group>
              <Avatar size={props.size} alt={characterCtx.currCharacter.name} color="var(--mantine-color-anchor)">
                {characterCtx.currCharacter.name.slice(0, 2).toUpperCase()}
              </Avatar>
              <Text truncate="end" maw={100} size={props.size}>
                {characterCtx.currCharacter.name}
              </Text>
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
            <Menu.Item
              leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}
              onClick={() => {
                openCreateSelector()
                setModalType("creating")
              }}
            >
              Create new character
            </Menu.Item>
            <Menu.Item leftSection={<IconFileArrowRight style={{ width: rem(14), height: rem(14) }} />} onClick={handleExportCharacter}>
              Export your character
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
  }
}

export default NavbarAvatar
