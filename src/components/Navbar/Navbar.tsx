import { AppShell, Burger, Group, Text, useMantineColorScheme, Button, Container, Paper, em } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { IconSun, IconMoon } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import NavbarAvatar from "./NavbarAvatar"

type MenuItems = {
  label: string
  route: string
}

const menuItems: MenuItems[] = [
  { label: "Characters", route: "/" },
  { label: "Spells", route: "/spells" },
  { label: "Dice Roller", route: "/dice-roller" },
]

function Navbar() {
  const [opened, { toggle }] = useDisclosure()
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark")
  }

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

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
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between">
            <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="sm" w={isMobile ? 100 : 300} />
            <Text size="xl" fw={900} w={{ lg: "300" }}>
              Clakter
            </Text>
            <Group gap="sm" visibleFrom="lg" justify="center">
              {menuItems.map((menuItem) => (
                <Button variant="subtle" radius="md" component={Link} to={menuItem.route} key={menuItem.label}>
                  {menuItem.label}
                </Button>
              ))}
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
        </Group>
      </AppShell.Navbar>
    </AppShell>
  )
}

export default Navbar
