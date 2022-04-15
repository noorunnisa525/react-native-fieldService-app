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
        backgroundColor: colors.background,
        paddingBottom: height(3),
      },
      title: {
        fontWeight: "bold",
        color: colors.primary,
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};
