import { Flex, Modal, Paper, useMantineColorScheme, Text, Group, Button, Tooltip, Stack } from "@mantine/core"
import DiceCalculator from "../DiceRoller/DiceCalculator.tsx"
import classes from "../DiceRoller/DiceRoller.module.css"
import { useEffect, useState } from "react"

type DiceRollModalProps = {
  opened: boolean
  close: () => void
  input: string
}

function DiceRollModal(props: DiceRollModalProps) {
  const [roll, setRoll] = useState(DiceCalculator(props.input))
  const [animate, setAnimate] = useState(false)

  function handleRollAgain() {
    setRoll(DiceCalculator(props.input))
    setAnimate(true)
    setTimeout(() => {
      setAnimate(false)
    }, 500)
  }

  useEffect(() => {
    if (props.opened) {
      setRoll(DiceCalculator(props.input))
      setAnimate(true)
      setTimeout(() => {
        setAnimate(false)
      }, 500)
    }
  }, [props.opened, props.input])

  const { colorScheme } = useMantineColorScheme()
  return (
    <Modal opened={props.opened} onClose={props.close} size="sm" radius="md" centered padding="md">
      {roll.results.map((dice, index) => (
        <Flex key={index + dice.score} align="center" direction="column" gap={5}>
          <Stack align="center" gap={0} mb="md">
            <Tooltip label="Roll Again">
              <Paper
                onClick={handleRollAgain}
                className={`${classes.dice} ${animate ? classes.rotate : ""}`}
                style={{
                  fill: colorScheme === "dark" ? "white" : "black",
                }}
              >
                <dice.type />
              </Paper>
            </Tooltip>
            <Text size="lg" fw={700} className={`${animate ? classes.shake : ""}`}>
              {dice.score}
            </Text>
          </Stack>
          {dice.score == 1 || dice.score == 20 ? (
            <Text c={dice.score == 1 ? "red" : "green"} size="lg" fw={700} className={`${animate ? classes.shake : ""}`}>
              {dice.score == 1 ? "Critical Failure" : "Critical Success"}
            </Text>
          ) : (
            <Text size="lg" fw={700} className={`${animate ? classes.shake : ""}`}>
              {roll.modifier
                ? roll.modifier < 0
                  ? "Total: " + dice.score + roll.modifier + " = " + (dice.score + roll.modifier)
                  : "Total: " + dice.score + " + " + roll.modifier + " = " + (dice.score + roll.modifier)
                : "Total: " + dice.score}
            </Text>
          )}
          <Group w="100%" mt="lg" grow>
            <Button size="md" variant="outline" onClick={handleRollAgain}>
              Roll Again
            </Button>
            <Button size="md" onClick={props.close}>
              Close
            </Button>
          </Group>
        </Flex>
      ))}
    </Modal>
  )
}
export default DiceRollModal
