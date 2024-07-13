import { createContext, ReactNode } from "react"
import { useLocalStorage } from "usehooks-ts"

export type Character = {
  name: string
  class: string
  race: string
  background: string
  proficiency: string
  alignment: string
  level: string
  attributes: { name: string; score: string; effect: number }[]
  savingThrows: { type: string; score: string; proficiency: boolean }[]
  skillChecks: { name: string; type: string; score: string; proficiency: boolean }[]
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
