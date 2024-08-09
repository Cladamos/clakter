import { createContext, ReactNode, useContext } from "react"
import { useLocalStorage } from "usehooks-ts"

export type createdSpell = {
  name: string
  desc: string
  level: string
  components: string
  casting_time: string
  range: string
  material: string
  duration: string
  school: string
  classes: string
}

export const CreatedSpellContext = createContext<{
  createdSpells: createdSpell[]
  setCreatedSpells: React.Dispatch<React.SetStateAction<createdSpell[]>>
} | null>(null)

export const CreatedSpellProvider = (props: { children: ReactNode }) => {
  const [createdSpells, setCreatedSpells] = useLocalStorage<createdSpell[]>("createdSpells", [])
  return <CreatedSpellContext.Provider value={{ createdSpells, setCreatedSpells }}>{props.children}</CreatedSpellContext.Provider>
}

export const useCreatedSpells = () => {
  const ctx = useContext(CreatedSpellContext)

  if (ctx === null) {
    throw new Error("CreatedSpellContext should be used within the CreatedSpellProvider")
  }

  return ctx
}
