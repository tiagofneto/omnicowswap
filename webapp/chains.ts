import { Chain } from "@rainbow-me/rainbowkit"

const gnosisChain: Chain = {
  id: 100,
  name: "Gnosis",
  network: "gnosis",
  iconUrl:
    "https://energyweb.org/wp-content/uploads/2021/02/gnosis_logo_sans_darkblue.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "xDAI",
    symbol: "XDAI",
  },
  rpcUrls: {
    default: "https://rpc.ankr.com/gnosis",
  },
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://blockscout.com/xdai/mainnet/",
    },
    etherscan: {
      name: "BlockScout",
      url: "https://blockscout.com/xdai/mainnet/",
    },
  },
  testnet: false,
}

const cronosChain: Chain = {
  id: 25,
  name: "Cronos",
  network: "cronos",
  iconUrl: "https://cronoscan.com/images/svg/brands/main.svg?v=22.7.1.0",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos",
    symbol: "CRO",
  },
  rpcUrls: {
    default: "https://cronosrpc-1.xstaking.sg",
  },
  blockExplorers: {
    default: {
      name: "Cronos explorer",
      url: "https://cronos.org/explorer/",
    },
    etherscan: {
      name: "Cronos explorer",
      url: "https://cronos.org/explorer/",
    },
  },
  testnet: false,
}

const celoChain: Chain = {
  id: 42220,
  name: "Celo",
  network: "celo",
  iconUrl: "https://cryptologos.cc/logos/celo-celo-logo.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Celo",
    symbol: "CELO",
  },
  rpcUrls: {
    default: "wss://forno.celo.org/ws",
  },
  blockExplorers: {
    default: {
      name: "Celo explorer",
      url: "https://explorer.celo.org/",
    },
    etherscan: {
      name: "Celo explorer",
      url: "https://explorer.celo.org/",
    },
  },
  testnet: false,
}

const neonChain: Chain = {
  id: 245022934,
  name: "Neon",
  network: "neon",
  iconUrl:
    "https://neonscan.org/static/media/icon-neon-circle-40.b278efbfcd6131760a6a9165fb2dd4a6.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Neon",
    symbol: "NEON",
  },
  rpcUrls: {
    default: "https://proxy.mainnet.neonlabs.org/solana",
  },
  blockExplorers: {
    default: {
      name: "Neonscan",
      url: "https://neonscan.org/",
    },
    etherscan: {
      name: "Neonscan",
      url: "https://neonscan.org/",
    },
  },
  testnet: false,
}

export default [gnosisChain, cronosChain, neonChain]
