import { ConnectButton } from "@rainbow-me/rainbowkit"
import type { NextPage } from "next"
import Head from "next/head"
import { Flex, Box, Text, Button, Spinner, useToast } from "@chakra-ui/react"
import { ArrowDownIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  useAccount,
  erc20ABI,
  useContractWrite,
  useToken,
  useWaitForTransaction,
  useContractEvent,
} from "wagmi"
import { parseUnits } from "ethers/lib/utils"

import Card from "../theme/Card"
import Currency from "../components/Currency"
import Footer from "../components/Footer"
import ErrorAlert from "../components/ErrorAlert"
import CONSTS from "../consts"
import omniSwapAbi from "../abi.json"

const CONTRACT_ADDRESS = "0xE20Dc74FF87C6C466A3Fe40580E54AbF12360fee"
const API_BASE = "http://192.168.102.246:3000"
export interface Token {
  name: string
  value: number
}

const tokens = [
  { name: "WETH", value: 1500 },
  { name: "USDC", value: 1 },
]

const Home: NextPage = () => {
  const { address, isConnected } = useAccount()
  const toast = useToast()

  const [token1, setToken1] = useState(tokens[0])
  const [token2, setToken2] = useState(tokens[1])

  const [amount1, setAmount1] = useState("")
  const [amount2, setAmount2] = useState("")

  const [error, setError] = useState("")

  const token1Info = useToken({ address: CONSTS.rinkeby[token1.name] })

  const { data, isError, isLoading, writeAsync } = useContractWrite({
    addressOrName: CONSTS.rinkeby[token1.name],
    contractInterface: erc20ABI,
    functionName: "approve", // Alwasy from t1
    args: [
      CONTRACT_ADDRESS,
      amount1 && parseUnits(amount1, token1Info.data?.decimals),
    ],
  })

  const waitForTx = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      axios.post(API_BASE + "/order", {
        buy: token1.name === "WETH" ? false : true,
        token: CONSTS.rinkeby[token1.name],
        amount: +amount1 * token1.value,
        address,
        chain: "ethereum", // TODO
        ethprice: 1500,
      })

      toast({
        position: "top-right",
        title: "🐮 Omni MOOO",
        description:
          "We're matching your swap with other users. Please be patient...",
        status: "info",
        duration: 8000,
        isClosable: true,
      })
    },
  })

  useContractEvent({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: omniSwapAbi,
    eventName: "SwapCompleted",
    listener: event => {
      console.log(event)

      let moo = new Audio("moo_2.mp3")
      moo.play()

      toast({
        position: "top-right",
        title: "🐮 Omni MOOO",
        description: "Swap compledted",
        status: "success",
        duration: 8000,
        isClosable: true,
      })
    },
  })

  const inverse = () => {
    setToken1(token2)
    setAmount1(amount2)
    setToken2(token1)
    setAmount2(amount1)
  }

  useEffect(() => {
    const amount2 =
      Math.round(((token1.value * +amount1) / token2.value) * 10000) / 10000
    setAmount2(amount2 + "")
  }, [token1, amount1, token2])

  const onSwap = async () => {
    if (!isConnected) {
      return setError("Please connect your wallet first")
    }
    if (!amount1 || isNaN(+amount1)) {
      return setError("Please enter a valid amount to swap")
    }

    console.log({ address, isConnected })

    // 1. Allow tx on mmask
    try {
      await writeAsync()
    } catch (e) {
      // TODO: handle err
    }
  }

  return (
    <>
      <ErrorAlert error={error} close={() => setError("")} />

      <Box
        background="url('bg2.jpg') center"
        backgroundSize="cover"
        h="100vh"
        w="100vw"
        position="absolute"
      >
        <Head>
          <title>OmniCow Swap | Moo</title>
          <meta
            name="description"
            content="Cowswap, but omnichain. Use all chains, and avoid slippage, MEV, and IEV instantly."
          />
          <link rel="icon" href="favicon.png" />
        </Head>

        <Flex justifyContent="space-between" m={3}>
          <img src="logo.svg" width={200} />
          <ConnectButton />
        </Flex>

        <Box
          p={4}
          display="flex"
          justifyContent="center"
          alignContent="center"
          w="100vw"
          h="100vh"
          as="main"
        >
          <Card variant="primary" maxW="460" margin="auto">
            <Text fontWeight="bold" mb={2}>
              Swap
            </Text>

            <Currency
              tokens={tokens}
              selected={token1}
              amount={amount1}
              changeSelected={e => setToken1(e)}
              changeAmount={e => setAmount1(e + "")}
            />
            <Box
              m={2}
              borderRadius="md"
              background="white"
              padding=".25rem .5rem"
              display="inline-block"
              cursor="pointer"
              onClick={inverse}
            >
              <ArrowDownIcon />
            </Box>
            <Currency
              tokens={tokens}
              selected={token2}
              amount={amount2}
              changeSelected={e => setToken2(e)}
              changeAmount={() => 0}
            />

            <Button
              variant="primary"
              mt={4}
              size="lg"
              width="100%"
              onClick={onSwap}
              disabled={isLoading || waitForTx.isLoading}
            >
              {!isLoading && !waitForTx.isLoading && "Swap"}
              {isLoading && (
                <>
                  Waiting for your approval...
                  <Spinner size="md" ml={2} />
                </>
              )}
              {waitForTx.isLoading && (
                <>
                  Waiting for tx success...
                  <Spinner size="md" ml={2} />
                </>
              )}
            </Button>
          </Card>
        </Box>

        <Footer />
      </Box>
    </>
  )
}

export default Home
