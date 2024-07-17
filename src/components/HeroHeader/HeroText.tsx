import { Title, Text, Button, Container, em } from "@mantine/core"
import { Dots } from "./Dots"
import classes from "./HeroText.module.css"
import { useMediaQuery } from "@mantine/hooks"

type HeroTextProps = {
  open: () => void
}

export function HeroText(props: HeroTextProps) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
  return (
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
          <Button className={classes.control} size="lg" onClick={props.open}>
            Create Your Character
          </Button>
        </div>
      </div>
    </Container>
  )
}
