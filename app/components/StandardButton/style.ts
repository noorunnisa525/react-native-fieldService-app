import { StyleSheet, useWindowDimensions } from "react-native";
import { useTheme } from "react-native-paper";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./../../store/slice";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "app/utils/dimensionUtil";

export const useStyle = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const dimensions = useWindowDimensions();

  const styles = () =>
    StyleSheet.create({
      view: {
        backgroundColor: theme.colors.icon,
        alignItems: "center",
        justifyContent: "center",
        width: width("10"),
        height: height("3.5"),
        borderRadius: 30,
        flexDirection: "row",
        // padding:'1%',
      },
      icon: { paddingRight: 10 },
      text: {
        color: theme.colors.background,
        fontSize: width("2%"),
        fontWeight: "bold",
      },
    });
  return React.useMemo(() => styles(), [isDark, height(1), width(1)]);
};
