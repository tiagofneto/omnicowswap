import { Flex, Input, Select, Text } from "@chakra-ui/react"
import { useState } from "react"
import Card from "../theme/Card"

const tokens = ["ETH", "USDC"]

const Currency = () => {
  const [token, setToken] = useState(tokens[0])
  const [amount, setAmount] = useState(0)

  return (
    <Card>
      <Flex>
        <Select
          w="100"
          variant="filled"
          placeholder="Select coin"
          value={token}
          onChange={e => setToken(e.target.value)}
        >
          {tokens.map(t => (
            <option value={t} key={t}>
              {t}
            </option>
          ))}
        </Select>
        <Input
          variant="unstyled"
          placeholder="0"
          textAlign="right"
          fontSize="2rem"
          fontWeight="bold"
          onChange={e => setAmount(parseInt(e.target.value))}
          value={amount}
        />
      </Flex>
      <Flex justifyContent="space-between">
        <Text colorScheme="green" fontFamily="Courier New">
          Balance: 0 USDC
        </Text>
        <Text colorScheme="green" fontFamily="Courier New">
          ≈ $ 0
        </Text>
      </Flex>
    </Card>
  )
}
export default Currency
