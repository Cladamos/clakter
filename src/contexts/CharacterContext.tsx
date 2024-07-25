import { createContext, ReactNode, useContext } from "react"
import { useLocalStorage } from "usehooks-ts"

export type Character = {
  id: string
  name: string
  class: string
  race: string
  background: string
  proficiency: string
  alignment: string
  level: string
  theme: string
  ac: string
  hitPoints: { hp: string; thp: string; hpMax: string }
  speed: string
  intiative: string
  attributes: { name: string; score: string; effect: number }[]
  savingThrows: { name: string; type: string; score: string; proficiency: boolean }[]
  skillChecks: { name: string; type: string; score: string; proficiency: boolean }[]
  personalTrait1: string
  personalTrait2: string
  ideals: string
  bonds: string
  flaws: string
}

export const CharacterContext = createContext<{
  characters: Character[]
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
  currCharacter: Character | null
  setCurrCharacter: React.Dispatch<React.SetStateAction<Character | null>>
} | null>(null)

export const CharacterProvider = (props: { children: ReactNode }) => {
  const [characters, setCharacters] = useLocalStorage<Character[]>("characters", [])
  const [currCharacter, setCurrCharacter] = useLocalStorage<Character | null>("currCharacter", null)

  return (
    <CharacterContext.Provider value={{ characters, setCharacters, currCharacter, setCurrCharacter }}>{props.children}</CharacterContext.Provider>
  )
}

export const useCharacter = () => {
  const ctx = useContext(CharacterContext)

  if (ctx === null) {
    throw new Error("CharacterContext should be used within the CharacterProvider")
  }

  return ctx
}
