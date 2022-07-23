import { Flex, Input, Select, Text } from "@chakra-ui/react"
import { useAccount, useBalance } from "wagmi"
import { formatUnits } from "ethers/lib/utils"
import { Token } from "../pages"
import Card from "../theme/Card"
import CONSTS from "../consts"

interface CurrencyProps {
  tokens: Token[]
  selected: Token
  amount: string
  changeSelected: (t: Token) => any
  changeAmount: (amount: string) => any
}

const Currency = (props: CurrencyProps) => {
  const { tokens, selected, amount, changeSelected, changeAmount } = props
  const { address } = useAccount()
  const { data } = useBalance({
    addressOrName: address,
    token: CONSTS.rinkeby[selected.name],
  })

  console.log({ data })

  const change = (name: string) => {
    const token = tokens.find(t => t.name === name)
    if (!token) {
      return
    }

    changeSelected(token)
  }

  const amountValue =
    Math.round(+amount * selected.value * 10000) / 10000 || "0"

  return (
    <Card>
      <Flex>
        <Select
          w="100"
          variant="filled"
          placeholder="Select coin"
          value={selected.name}
          onChange={e => change(e.target.value)}
        >
          {tokens.map(({ name }) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </Select>
        <Input
          variant="unstyled"
          placeholder="0"
          textAlign="right"
          fontSize="2rem"
          fontWeight="bold"
          onChange={e => changeAmount(e.target.value)}
          value={amount}
        />
      </Flex>
      <Flex justifyContent="space-between">
        <Text colorScheme="green" fontFamily="Courier New">
          Balance:{" "}
          {data
            ? Number(formatUnits(data.value, data.decimals)).toLocaleString(
                "en-US"
              )
            : 0}
        </Text>
        <Text colorScheme="green" fontFamily="Courier New">
          ≈ ${amountValue.toLocaleString("en-US")}
        </Text>
      </Flex>
    </Card>
  )
}
export default Currency
