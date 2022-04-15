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
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const styles = () =>
    StyleSheet.create({
      container: {
        width: width("100%"),
        backgroundColor: theme.colors.background,
        flexDirection: "row",
        padding: width("2%"),
      },
      subContainer: {
        width: width("50%"),
        backgroundColor: theme.colors.background,
        flexDirection: "column",
        paddingVertical: height("1.1%"),
      },

      title: {
        width: "80%",
        fontSize: width("2.5%"),
        color: theme.colors.backdrop,
      },
      text: {
        fontSize: width("3%"),
        color: theme.colors.text,
      },
      notesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: width("1%"),
        width: "100%",
      },
      notes: {
        fontSize: width("2.5%"),
        color: theme.colors.backdrop,
      },
      detailNotes: {
        textAlign: "left",
        width: "100%",
        paddingHorizontal: width("2%"),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};
