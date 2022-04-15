import { StyleSheet } from "react-native";
import { RootState } from "../../store/slice";
import { useTheme } from "react-native-paper";
import React from "react";
import { useSelector } from "react-redux";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "../../utils/dimensionUtil";

export const useStyle = () => {
  const { colors } = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const styles = () =>
    StyleSheet.create({
      main: {
        backgroundColor: colors.background,
        height: height(100),
        width: width(100),
      },
      container: {
        paddingBottom: height(3),
      },
      title: {
        fontWeight: "bold",
        color: colors.primary,
      },
      topServiceButtonView: {
        flexDirection: "row",
        width: width(80),
        alignSelf: "center",
        justifyContent: "space-between",
        paddingBottom: "3%",
      },
      bottomServiceButtonView: {
        flexDirection: "row",
        width: width(80),
        alignSelf: "center",
        justifyContent: "space-between",
      },
    });
  return React.useMemo(() => styles(), [isDark, height(1), width(1)]);
};
