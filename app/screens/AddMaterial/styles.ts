import { StyleSheet } from "react-native";
import { RootState } from "./../../store/slice";
import { useTheme } from "react-native-paper";
import React from "react";
import { useSelector } from "react-redux";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "./../../utils/dimensionUtil";

export const useStyle = () => {
  const { colors } = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const styles = () =>
    StyleSheet.create({
      container: {
        alignItems: "center",
        justifyContent: "center",
      },
      title: {
        fontWeight: "bold",
        color: colors.primary,
      },
      titleBar: {
        width: width("100%"),
        backgroundColor: colors.secondary,
        borderColor: colors.text,
        borderWidth: height("0.1%"),
        justifyContent: "space-between",
        flexDirection: "row",
        padding: width("2%"),
      },
      titleBarHeading: {
        fontWeight: "bold",
        fontSize: width("2.5%"),
        color: colors.title,
        marginRight: width("10%"),
      },
      description: {
        fontWeight: "bold",
        fontSize: width("2.5%"),
        color: colors.title,
      },
      heading: {
        width: width("100%"),
        backgroundColor: colors.secondary,
        borderColor: colors.text,
        borderWidth: height("0.1%"),
        justifyContent: "space-between",
        flexDirection: "row",
        padding: width("2%"),
      },
      textBox: {
        flexDirection: "row",
        width: width("100%"),
        alignItems: "center",
        justifyContent: "center",
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};
