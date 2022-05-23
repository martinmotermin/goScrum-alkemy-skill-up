import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./styles/components/ButtonStyles";

export default extendTheme({
  colors: {
    primary: "#FF452B",
    yellow: "#FBDE3F",
    green: "#1EC876",
    blue: "#007BFF",
  },

  borderRadius: { radii: { lg: "8px" } },

  components: {
    Button,
  },

  styles: {
    global: {
      body: {
        fontFamily: "Inter, san-serif",
        bg: "#FAFAFA",
        color: "#000000",
      },
    },
  },
});
