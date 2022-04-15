import { DarkTheme as PaperDarkTheme } from "react-native-paper";

const darkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: "white",
    secondary: "rgb(200,18,42)",
    background: "black",
    title: "white",
    icon: "rgb(200,18,42)",
    barStyle: "dark-content",
    text: "white",
    accent: "rgb(223,223,223)",
    borderColor: "black",
    borderShow: "#FFFFFF",
    backdrop: "gray",
    underlayColor: "lightgray",
  },
};

export default darkTheme;
