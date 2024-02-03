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
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text size="xl" fw={900}>
              Clakter
            </Text>
            <Group gap="sm" visibleFrom="sm" justify="center">
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
            <Group justify="flex-end">
              <Group visibleFrom="sm">
                <Button variant="outline"> Login</Button>
                <Button> Sign up </Button>
              </Group>
              <Button onClick={toggleColorScheme} px={6} radius={8}>
                {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Navbar py="md" px="sm">
        <Group gap="xl">
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
              >
                {menuItem.label}
              </Button>
            ))}
          </Group>
          <Group px="lg" grow w="100%" gap="md">
            <Button size="md" variant="outline">
              Login
            </Button>
            <Button size="md">Sign up</Button>
          </Group>
        </Group>
      </AppShell.Navbar>
    </AppShell>
  );
}

export default Navbar;
