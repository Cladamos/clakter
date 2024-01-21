import {
  AppShell,
  Burger,
  Group,
  Text,
  useMantineColorScheme,
  Button,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { Link } from "react-router-dom";

type MenuItems = {
  label: string;
  route: string;
};

const menuItems: MenuItems[] = [
  { label: "Home", route: "/" },
  { label: "Spells", route: "/spells" },
  { label: "Characters", route: "/characters" },
  { label: "Dice Roller", route: "/dice-roller" },
];

function Navbar() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Container size="xl" h={60}>
          <Group px="sm" h="100%">
            <Group justify="space-between" style={{ flex: 1 }}>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Text size="xl" fw={900}>
                Clakter
              </Text>
              <Group gap={70}>
                <Group ml="xl" gap={30} visibleFrom="sm">
                  {menuItems.map((menuItem) => (
                    <Button
                      variant="subtle"
                      radius="md"
                      component={Link}
                      to={menuItem.route}
                    >
                      {menuItem.label}
                    </Button>
                  ))}
                </Group>
                <Button onClick={toggleColorScheme} px={6} radius={8}>
                  {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
                </Button>
              </Group>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Navbar py="md" px="sm">
        {menuItems.map((menuItem) => (
          <Button
            variant="subtle"
            justify="start"
            size="lg"
            radius="md"
            component={Link}
            to={menuItem.route}
          >
            {menuItem.label}
          </Button>
        ))}
      </AppShell.Navbar>
    </AppShell>
  );
}

export default Navbar;
