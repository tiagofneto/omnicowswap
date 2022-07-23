import { Box, Link } from "@chakra-ui/react"

const team = [
  { name: "yome", twitter: "guill__om" },
  { name: "omar", twitter: "OptimisticOmni" },
  { name: "tiago", twitter: "0xtiagofneto" },
  { name: "lachlan", twitter: "FlowTranquil" },
]
const Footer = () => (
  <Box
    as="footer"
    margin="auto"
    textAlign="center"
    bottom="0"
    position="fixed"
    width="100%"
    background="white"
    p={2}
  >
    Made with ❤️ at Ethcc hack in Paris 🥐🇪🇺 by{" "}
    {team.map(({ name, twitter }, i) => (
      <Box as="span" key={twitter}>
        <Link
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          color="blue.600"
        >
          {name}
        </Link>
        {(team[i + 2] && ", ") || (team[i + 1] && " & ") || ""}
      </Box>
    ))}
  </Box>
)

export default Footer
