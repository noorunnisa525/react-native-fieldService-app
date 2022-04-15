import { RootState } from "./../../store/slice";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSelector } from "react-redux";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "../../utils/dimensionUtil";
import { useTheme } from "react-native-paper";
export const useStyle = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const width = getPercentageWidth();
  const height = getPercentageHeight();
  const dimensions = useWindowDimensions();
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      },
      subContainer: {
        marginTop: "10%",
        // backgroundColor: colors.primary,
        borderRadius: 20,
        alignItems: "center",
        borderWidth: 2,
        padding: 20,
        borderColor: isDark ? "teal" : "black",
      },
      contentContainerStyle: {
        height: height("100%"),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      },
      logoStyles: {
        width: width("70%"),
        height: height("20%"),
      },
      labelStyle: {
        padding: 10,
        fontSize: 15,
        color: isDark ? "teal" : "black",
      },
      appleButton: {
        width: width("50%"),
        height: height("5%"),
        marginTop: "3%",
      },
    });
  return React.useMemo(() => styles(), [isDark, width(1), height(1)]);
};
