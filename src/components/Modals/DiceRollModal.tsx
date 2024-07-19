import { Flex, Modal, Paper, useMantineColorScheme, Text, Group, Button, Tooltip } from "@mantine/core"
import DiceCalculator from "../DiceCalculator"
import classes from "../DiceRoller.module.css"
import { useEffect, useState } from "react"

type DiceRollModalProps = {
  opened: boolean
  close: () => void
  input: string
}

//TODO: Fix dice transitions

function DiceRollModal(props: DiceRollModalProps) {
  const [roll, setRoll] = useState(DiceCalculator(props.input))
  function handleRollAgain() {
    setTimeout(() => {
      setRoll(DiceCalculator(props.input))
    }, 300)
  }

  useEffect(() => {
    if (props.opened) {
      setRoll(DiceCalculator(props.input))
    }
  }, [props.opened, props.input])

  const { colorScheme } = useMantineColorScheme()
  return (
    <Modal opened={props.opened} onClose={props.close} size="sm" radius="md" centered padding="md">
      {roll.results.map((dice, index) => (
        <Flex key={index + dice.score} align="center" direction="column" gap={5}>
          <Tooltip label="Roll Again">
            <Paper
              onClick={handleRollAgain}
              className={`${classes.dice}`}
              style={{
                fill: colorScheme === "dark" ? "white" : "black",
              }}
            >
              <dice.type />
            </Paper>
          </Tooltip>
          <Text size="lg" fw={700}>
            {"Total: " + dice.score + " + " + roll.modifier + " = " + (dice.score + roll.modifier)}
          </Text>
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
