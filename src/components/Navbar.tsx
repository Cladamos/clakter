import { AppShell, Burger, Group, Text, useMantineColorScheme, Button, Container, Paper } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconSun, IconMoon } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import NavbarAvatar from "./NavbarAvatar"

type MenuItems = {
  label: string
  route: string
}

const menuItems: MenuItems[] = [
  { label: "Home", route: "/" },
  { label: "Spells", route: "/spells" },
  { label: "Characters", route: "/characters" },
  { label: "Dice Roller", route: "/dice-roller" },
]

function Navbar() {
  const [opened, { toggle }] = useDisclosure()
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark")
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
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between">
            <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="sm" w={{ sm: "100", lg: "300" }} />
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
            <Group justify="flex-end" w={{ sm: "100", lg: "300" }} gap="lg">
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
            <Button w="100%" variant="subtle" justify="start" size="lg" radius="md" component={Link} to={menuItem.route} onClick={toggle}>
              {menuItem.label}
            </Button>
          ))}
        </Group>
      </AppShell.Navbar>
    </AppShell>
  )
}

export default Navbar
