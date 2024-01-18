import {
  AppShell,
  Burger,
  Group,
  Text,
  useMantineColorScheme,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSun, IconMoon } from "@tabler/icons-react";

const buttons: string[] = ["Home", "Contact", "Support"];

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
        <Group h="100%" px="xl">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text size="xl" fw={900}>
              Clabook
            </Text>
            <Group gap={70}>
              <Group ml="xl" gap={30} visibleFrom="sm">
                {buttons.map((button) => (
                  <Button variant="subtle" color="indigo">
                    {button}
                  </Button>
                ))}
              </Group>
              <Button
                onClick={toggleColorScheme}
                px={6}
                radius={8}
                color="indigo"
              >
                {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
              </Button>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar py="md" px="sm">
        {buttons.map((button) => (
          <Button variant="subtle" color="indigo" justify="start">
            {button}
          </Button>
        ))}
      </AppShell.Navbar>
    </AppShell>
  );
}

export default Navbar;
