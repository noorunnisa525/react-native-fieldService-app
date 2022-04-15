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
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.background,
      },
      title: {
        fontWeight: "bold",
        color: colors.primary,
      },
      footer: { flex: 1, justifyContent: "center", alignItems: "center" },
      serviceButtonStyles: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: width("2%"),
        justifyContent: "center",
        alignItems: "center",
      },
      workOrderComponentStyle: {
        paddingLeft: width("2.5%"),
      },
      workOrderComponentTitle: {
        color: colors.text,
        fontWeight: "bold",
        fontSize: width("3%"),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};
