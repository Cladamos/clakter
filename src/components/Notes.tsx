import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable"
import { restrictToParentElement } from "@dnd-kit/modifiers"
import {
  ActionIcon,
  Button,
  Card,
  ColorPicker,
  Container,
  Grid,
  Group,
  Popover,
  PopoverDropdown,
  ScrollArea,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocalStorage } from "usehooks-ts"

type Note = {
  id: string
  title: string
  content: string
  color: string
  isEditing: boolean
}

//TODO: Add smooth scroll to drag and drop

function SortableNote({
  note,
  handleEditNote,
  handleDeleteNote,
}: {
  note: Note
  handleEditNote: (note: Note) => void
  handleDeleteNote: (note: Note) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: note.id })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Grid.Col span={{ base: 12, md: 6, lg: 4 }} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card withBorder shadow="sm" radius="md" h={250} bg={note.color}>
        <Card.Section withBorder inheritPadding p="sm">
          <Group justify="space-between" wrap="nowrap">
            <Text size="lg" truncate="end">
              {note.title}
            </Text>
            <Group gap="xs" wrap="nowrap">
              <ActionIcon variant="transparent" color="var(--mantine-color-text)" onClick={() => handleDeleteNote(note)}>
                <IconTrash />
              </ActionIcon>
              <ActionIcon variant="transparent" color="var(--mantine-color-text)" onClick={() => handleEditNote(note)}>
                <IconPencil />
              </ActionIcon>
            </Group>
          </Group>
        </Card.Section>
        <ScrollArea>
          <Text pt="xs">{note.content}</Text>
        </ScrollArea>
      </Card>
    </Grid.Col>
  )
}

function Notes() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", [
    { id: "321", title: "dsad", content: "qweqweq", color: "cyan", isEditing: false },
    { id: "sdsds", title: "qeweqweq", content: "asdad", color: "red", isEditing: false },
  ])

  const [noteTitle, setNoteTitle] = useState("")
  const [noteContent, setNoteContent] = useState("")
  const [noteColor, setNoteColor] = useState("gray")
  const [editId, setEditId] = useState("")

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      const activeIndex = notes.findIndex((n) => n.id === active.id)
      const overIndex = notes.findIndex((n) => n.id === over.id)

      const newNotes = arrayMove(notes, activeIndex, overIndex)
      setNotes(newNotes)
    }
  }

  function handleCreateNote() {
    if (noteTitle == "" && noteContent == "") {
      notifications.show({
        title: "Empty note",
        message: "You can't create a empty note",
        color: "red",
      })
      return
    }
    if (editId !== "") {
      setNotes((notes) => [
        ...notes.map((n) => (n.id == editId ? { id: editId, title: noteTitle, content: noteContent, color: noteColor, isEditing: false } : n)),
      ])
      notifications.show({
        title: "Succesful",
        message: "Your note is succesfuly edited",
      })
      setEditId("")
    } else {
      setNotes((notes) => [...notes, { id: uuidv4(), title: noteTitle, content: noteContent, color: noteColor, isEditing: false }])
      notifications.show({
        title: "Created",
        message: "Your note is succesfuly created",
      })
    }
    setNoteTitle("")
    setNoteContent("")
  }

  function handleDeleteNote(n: Note) {
    setNotes((notes) => [...notes.filter((note) => note.id !== n.id)])
    notifications.show({
      title: "Deleted",
      message: "Your note is succesfuly deleted",
      color: "red",
    })
  }

  function handleEditNote(n: Note) {
    setNotes((notes) => [...notes.map((note) => (note.id == n.id ? n : { ...note, isEditing: true }))])
    setNoteTitle(n.title)
    setNoteContent(n.content)
    setNoteColor(n.color)
    setEditId(n.id)
  }

  return (
    <Container size="lg" mt={100}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]} autoScroll>
        <SortableContext items={notes} strategy={rectSortingStrategy}>
          <ScrollArea scrollbars="y" h={800} offsetScrollbars>
            <Grid>
              {notes.map((n) => (
                <SortableNote key={n.id} note={n} handleEditNote={handleEditNote} handleDeleteNote={handleDeleteNote} />
              ))}
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <Card withBorder shadow="sm" radius="md" h={250} style={{ display: "flex", flexDirection: "column" }}>
                  <Card.Section withBorder inheritPadding py={1} pb={1}>
                    <Group justify="space-between" align="flex-start">
                      <TextInput
                        value={noteTitle}
                        size="lg"
                        variant="unstyled"
                        placeholder="Title"
                        onChange={(event) => setNoteTitle(event.currentTarget.value)}
                      />
                    </Group>
                  </Card.Section>
                  <Textarea
                    value={noteContent}
                    size="md"
                    placeholder="Your Note ..."
                    variant="unstyled"
                    autosize
                    maxRows={5}
                    style={{ flexGrow: 1, marginBottom: "auto" }}
                    onChange={(event) => setNoteContent(event.currentTarget.value)}
                  ></Textarea>
                  <Group justify="space-between">
                    <Button size="sm" variant="default" style={{ marginTop: "auto", flexGrow: 1 }} onClick={handleCreateNote}>
                      {editId !== "" ? "Edit your note" : "Take note"}
                    </Button>
                    <Popover>
                      <Popover.Target>
                        <Button size="sm" color={noteColor}></Button>
                      </Popover.Target>
                      <PopoverDropdown>
                        <ColorPicker value={noteColor} onChange={setNoteColor} format="hexa" />
                      </PopoverDropdown>
                    </Popover>
                  </Group>
                </Card>
              </Grid.Col>
            </Grid>
          </ScrollArea>
        </SortableContext>
      </DndContext>
    </Container>
  )
}
export default Notes
