import { Button, Divider, Modal, ScrollArea, Stack } from "@mantine/core"
import { Character, useCharacter } from "../../contexts/CharacterContext"
import { useTheme } from "../../contexts/ThemeContext"

type Props = {
  opened: boolean
  close: () => void
}

const characterPresets: Character[] = [
  {
    id: "preset-1",
    name: "Bham",
    class: "Barbarian",
    race: "Half-Orc",
    background: "Outlander",
    proficiency: "+2",
    alignment: "Neutral Good",
    level: "3 Level",
    theme: "red",
    ac: "14",
    hitPoints: { hpMax: "33", hp: "33", thp: "0" },
    speed: "30ft",
    intiative: "+1",
    attributes: [
      { name: "strength", score: "16", effect: 3 },
      { name: "dexterity", score: "13", effect: 1 },
      { name: "constitution", score: "16", effect: 3 },
      { name: "intelligence", score: "8", effect: -1 },
      { name: "wisdom", score: "10", effect: 0 },
      { name: "charisma", score: "12", effect: 1 },
    ],
    savingThrows: [
      { name: "strength", type: "str", score: "+5", proficiency: true },
      { name: "dexterity", type: "dex", score: "+1", proficiency: false },
      { name: "constitution", type: "con", score: "+5", proficiency: true },
      { name: "intelligence", type: "int", score: "-1", proficiency: false },
      { name: "wisdom", type: "wis", score: "0", proficiency: false },
      { name: "charisma", type: "cha", score: "+1", proficiency: false },
    ],
    skillChecks: [
      { name: "acrobatics", type: "dex", score: "+1", proficiency: false },
      { name: "animalHandling", type: "wis", score: "0", proficiency: false },
      { name: "arcana", type: "int", score: "-1", proficiency: false },
      { name: "athletics", type: "str", score: "+5", proficiency: true },
      { name: "deception", type: "cha", score: "+1", proficiency: false },
      { name: "history", type: "int", score: "-1", proficiency: false },
      { name: "insight", type: "wis", score: "0", proficiency: false },
      { name: "intimidation", type: "cha", score: "+3", proficiency: true },
      { name: "investigation", type: "int", score: "-1", proficiency: false },
      { name: "medicine", type: "wis", score: "0", proficiency: false },
      { name: "nature", type: "int", score: "+1", proficiency: true },
      { name: "perception", type: "wis", score: "+2", proficiency: true },
      { name: "performance", type: "cha", score: "+1", proficiency: false },
      { name: "persuasion", type: "cha", score: "+1", proficiency: false },
      { name: "religion", type: "int", score: "-1", proficiency: false },
      { name: "sleightOfHand", type: "dex", score: "+1", proficiency: false },
      { name: "stealth", type: "dex", score: "+1", proficiency: false },
      { name: "survival", type: "wis", score: "+2", proficiency: true },
    ],
    personalTrait1: "I have a lesson for every situation, drawn from observing nature.",
    personalTrait2: "I place no stock in wealthy or well-mannered folk. Money and manners won't saveyou from a hungry owlbear.",
    ideals: "Glory. I must earn glory in battle, for myself and my clan.",
    bonds: "My family, clan or tribe is the most important thing in my life, even when they are far from me.",
    flaws: "Violence is my answer to almost any challenge.",
    spells: { results: [] },
  },
]

function CreateFromPresetsModal(props: Props) {
  const characterCtx = useCharacter()
  const { setThemeColor } = useTheme()
  function handleSelectPreset(id: string) {
    const currentPreset = characterPresets.find((c) => c.id === id)!
    characterCtx.setCurrCharacter(currentPreset)
    characterCtx.setCharacters((c) => [...c, currentPreset])
    setThemeColor(currentPreset.theme)
    props.close()
  }
  return (
    <Modal onClose={props.close} opened={props.opened} size="sm" radius="md" centered padding="md" title="Select from presets">
      <ScrollArea h={300} scrollbars="y">
        <Stack>
          <Divider />
          {characterPresets.map((c) => (
            <Stack key={c.id}>
              <Button fullWidth variant="subtle" justify="flex-start" size="md" key={c.id} color={c.theme} onClick={() => handleSelectPreset(c.id)}>
                {c.class + "/" + c.race + "/" + c.level}
              </Button>
              <Divider />
            </Stack>
          ))}
        </Stack>
      </ScrollArea>
    </Modal>
  )
}
export default CreateFromPresetsModal
