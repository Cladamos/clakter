import { Title, Text, Button, Container, em, Tooltip } from "@mantine/core"
import { Dots } from "./Dots"
import classes from "./HeroText.module.css"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import SelectCharacterModal from "../Modals/SelectCharacterModal"
import { useCharacter } from "../../contexts/CharacterContext"

type HeroTextProps = {
  open: () => void
}

export function HeroText(props: HeroTextProps) {
  const characterCtx = useCharacter()
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <SelectCharacterModal opened={opened} close={close} />
      <Container className={classes.wrapper} size={1400} mt={isMobile ? 150 : 300}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Create your character with{" "}
            <Text component="span" className={classes.highlight} inherit>
              Clakter
            </Text>{" "}
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" c="dimmed" className={classes.description}>
              Create your character and experience all great tools of Clakter
            </Text>
          </Container>

          <div className={classes.controls}>
            {characterCtx.characters.length === 0 ? (
              <Tooltip label="You don't have any characters">
                <Button className={classes.control} size="lg" disabled>
                  Select Character
                </Button>
              </Tooltip>
            ) : (
              <Button className={classes.control} size="lg" onClick={open} variant="outline">
                Select Character
              </Button>
            )}
            <Button className={classes.control} size="lg" onClick={props.open}>
              Create Your Character
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}
