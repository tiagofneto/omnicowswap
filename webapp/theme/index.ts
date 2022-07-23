// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from "@chakra-ui/react"
// import Card from "./Card"

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        // bg: "red",
        // color: "white",
      },
    },
  },
  components: {
    // Select: {
    //   baseStyle: {
    //     border: "2px solid rgb(175, 203, 218)",
    //     background: "white",
    //     padding: 3,
    //     borderRadius: 16,
    //   },
    //   variants: {
    //     test: {
    //       border: "5px solid red",
    //       color: "blue",
    //     },
    //   },
    // },
    Card: {
      baseStyle: {
        border: "2px solid rgb(175, 203, 218)",
        background: "white",
        padding: 3,
        borderRadius: "xl",
      },
      variants: {
        primary: {
          border: "3px solid rgb(0, 0, 0)",
          boxShadow: "rgb(0, 0, 0) 4px 4px 0px",
          background: "rgb(213, 233, 240) none repeat scroll 0% 0%",
        },
      },
    },
    Button: {
      variants: {
        primary: {
          border: "3px solid rgb(0, 0, 0)",
          boxShadow: "rgb(0, 0, 0) 4px 4px 0px",
          background: "orange.400",
          padding: 3,
          borderRadius: "xl",

          "&:hover": {
            transform: "translate(4px, 4px)",
            boxShadow: "rgb(0, 0, 0) 0px 0px 0px",
          },
        },
      },
    },
  },
})

export default theme
