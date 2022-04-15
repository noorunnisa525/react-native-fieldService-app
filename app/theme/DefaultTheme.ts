import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";
export const defaultTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: "black",
    secondary: "rgb(200,18,42)",
    accent: "rgb(223,223,223)",
    background: "white",
    title: "white",
    icon: "rgb(200,18,42)",
    barStyle: "light-content",
    text: "black",
    borderColor: "ghostwhite",
    borderShow: "#000",
    backdrop: "grey",
    underlayColor: "lightgray",
  },
};

export default defaultTheme;
