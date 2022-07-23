import { Box, BoxProps, ThemingProps, useStyleConfig } from "@chakra-ui/react"

const Card = (props: BoxProps & ThemingProps) => {
  const { variant, ...rest } = props as any

  const styles = useStyleConfig("Card", { variant })

  // Pass the computed styles into the `__css` prop
  return <Box __css={styles} {...rest} />
}
export default Card
