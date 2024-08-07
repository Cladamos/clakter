import { AppShell, Burger, Group, Text, useMantineColorScheme, Button, Container, Paper, em, HoverCard, Tooltip, Stack } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { IconSun, IconMoon } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import classes from "../DiceRoller/DiceRoller.module.css"
import NavbarAvatar from "./NavbarAvatar"

import D4 from "../../assets/diceSvgs/dice-d4.svg?react"
import D6 from "../../assets/diceSvgs/dice-d6.svg?react"
import D8 from "../../assets/diceSvgs/dice-d8.svg?react"
import D10 from "../../assets/diceSvgs/dice-d10.svg?react"
import D12 from "../../assets/diceSvgs/dice-d12.svg?react"
import D20 from "../../assets/diceSvgs/dice-d20.svg?react"
import DiceRollModal from "../Modals/DiceRollModal"
import { useState } from "react"

type MenuItems = {
  label: string
  route: string
}

const dices = [
  { svg: D4, damage: "1d4" },
  { svg: D6, damage: "1d6" },
  { svg: D8, damage: "1d8" },
  { svg: D10, damage: "1d10" },
  { svg: D12, damage: "1d12" },
  { svg: D20, damage: "1d20" },
]

const menuItems: MenuItems[] = [
  { label: "Characters", route: "/" },
  { label: "Spells", route: "/spells" },
  { label: "Notes", route: "/notes" },
]

function Navbar() {
  const [opened, { toggle }] = useDisclosure()
  const [openedDiceRollModal, { open: openDiceRollModal, close: closeDiceRollModal }] = useDisclosure(false)
  const [rollInput, setRollInput] = useState("")

  const { colorScheme, setColorScheme } = useMantineColorScheme()

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark")
  }

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  function handleRollDice(damage: string) {
    setRollInput(damage)
    openDiceRollModal()
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "lg",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <DiceRollModal opened={openedDiceRollModal} close={closeDiceRollModal} input={rollInput} />
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="sm" w={isMobile ? 100 : 300} />
            <Text size="xl" fw={900} w={{ lg: "300" }} component={Link} to={"/"}>
              Clakter
            </Text>
            <Group gap="sm" visibleFrom="lg" justify="center">
              {menuItems.map((menuItem) => (
                <Button variant="subtle" radius="md" component={Link} to={menuItem.route} key={menuItem.label}>
                  {menuItem.label}
                </Button>
              ))}
              <HoverCard withinPortal={false} closeDelay={openedDiceRollModal ? 0 : 150}>
                <HoverCard.Target>
                  <Button variant="subtle" radius="md" component={Link} to={"/dice-roller"} key={"Dice Roller"}>
                    Dice Roller
                  </Button>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Stack gap="xs">
                    <Text style={{ textAlign: "center" }}>Quick Roll Menu</Text>
                    <Paper withBorder py="xs">
                      {dices.map((dice) => (
                        <Tooltip label={dice.damage === "" ? `Modifier` : `Roll ${dice.damage}`} key={dice.svg.toString()}>
                          <Button
                            className={`${classes.dice} ${classes.small_dice}`}
                            style={{
                              fill: colorScheme === "dark" ? "white" : "black",
                            }}
                            variant="subtle"
                            radius="md"
                            onClick={() => handleRollDice(dice.damage)}
                          >
                            <dice.svg />
                          </Button>
                        </Tooltip>
                      ))}
                    </Paper>
                  </Stack>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>
            <Group justify="flex-end" w={isMobile ? 100 : 300} gap="xl">
              <Paper visibleFrom="lg">
                <NavbarAvatar size="md" />
              </Paper>
              <Button onClick={toggleColorScheme} px={6} radius={8}>
                {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Navbar py="md" px="sm">
        <Paper m="lg">
          <NavbarAvatar size="md" />
        </Paper>
        <Group>
          {menuItems.map((menuItem) => (
            <Button
              w="100%"
              variant="subtle"
              justify="start"
              size="lg"
              radius="md"
              component={Link}
              to={menuItem.route}
              key={menuItem.label}
              onClick={toggle}
            >
              {menuItem.label}
            </Button>
          ))}
          <Button
            w="100%"
            variant="subtle"
            justify="start"
            size="lg"
            radius="md"
            component={Link}
            to="/dice-roller"
            key="Dice Roller"
            onClick={toggle}
          >
            Dice Roller
          </Button>
        </Group>
      </AppShell.Navbar>
    </AppShell>
  )
}

export default Navbar
