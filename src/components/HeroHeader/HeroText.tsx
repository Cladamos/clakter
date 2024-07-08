import { Title, Text, Button, Container } from "@mantine/core"
import { Dots } from "./Dots"
import classes from "./HeroText.module.css"

type HeroTextProps = {
  open: () => void
}

export function HeroText(props: HeroTextProps) {
  return (
    <Container className={classes.wrapper} size={1400} mt={300}>
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
            Create your first character and experience all great tools of Clakter
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} size="lg" onClick={props.open}>
            Create Your First Character
          </Button>
        </div>
      </div>
    </Container>
  )
}
