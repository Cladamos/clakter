import axios from "axios"
import fs from "fs"

const baseUrl = "https://www.dnd5eapi.co/api"
const spellsUrl = `${baseUrl}/spells`

async function fetchAllSpells() {
  try {
    const response = await axios.get(spellsUrl)
    return response.data.results
  } catch (error) {
    console.error("Error fetching spells:", error)
    return []
  }
}

async function fetchSpellDetails(index) {
  try {
    const response = await axios.get(`${spellsUrl}/${index}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching details for spell ${index}:`, error)
    return null
  }
}

async function createSpellsJson() {
  const spells = await fetchAllSpells()
  const spellsBySchool = {}

  for (const spell of spells) {
    const details = await fetchSpellDetails(spell.index)
    if (details && details.school) {
      const schoolName = details.school.name
      if (!spellsBySchool[schoolName]) {
        spellsBySchool[schoolName] = []
      }
      spellsBySchool[schoolName].push(spell.index)
    }
  }

  fs.writeFileSync("../public/spell-by-school.json", JSON.stringify(spellsBySchool, null, 2))
  console.log("JSON file created successfully!")
}

createSpellsJson()
