import { StyleSheet, useWindowDimensions, Dimensions } from "react-native";
import { RootState } from "./../../store/slice";
import { useTheme } from "react-native-paper";
import React from "react";
import { useSelector } from "react-redux";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "../../../utils/dimensionUtil";
export const useStyle = () => {
  const { colors } = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const dimensions = useWindowDimensions();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const theme = useTheme();

  const styles = () =>
    StyleSheet.create({
      container: {
        flexDirection: "row",
        alignItems: "center",
      },
      colum: { flexDirection: "column" },
      heading: {
        color: theme.colors.backdrop,
        fontSize: width("2.1%"),
      },
      headerValue: {
        color: theme.colors.primary,
        fontWeight: "bold",
        fontSize: width("2.1%"),
      },
      rowCenter: { flexDirection: "row", alignItems: "center" },
      listComponent: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingTop: 20,
      },
      emptyText: {
        fontSize: 8,
      },
      emptyHeaderText: {
        color: theme.colors.text,
        fontWeight: "bold",
        fontSize: width("2%"),
      },
      mainContainer: {
        left: width("1%"),
        paddingTop: height("2%"),
        flexDirection: "row",
        alignItems: "center",
      },
      workOrderComponentHeading: {
        color: colors.text,
        fontWeight: "bold",
        fontSize: width("2.5%"),
        paddingLeft: width("3%"),
      },
      workOrderRowLine: {
        borderWidth: width("0.3%"),
        width: 0,
        borderColor: colors.accent,
        left: windowHeight > windowWidth ? width("1.53%") : width("1.7%"),
        height: windowHeight > windowWidth ? height("15%") : height("25"),
      },
      workOrderRowBox: {
        shadowColor: colors.borderShow,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 3.22,
        elevation: 4,
        width: width("87%"),
        borderColor: colors.accent,
        borderWidth: theme.dark ? width("0.05%") : 0,
        marginLeft: width("5%"),
        backgroundColor: theme.colors.background,
        borderRadius: height("2%"),
        flexDirection: "row",
      },
      workOrderRowText: {
        flexDirection: "column",
        justifyContent: "space-around",
        width: "35%",
        paddingVertical: height(1),
      },
      workOrderTextHeading: {
        color: theme.colors.backdrop,
        fontSize: width("2.1%"),
      },
      workOrderText: {
        color: theme.colors.primary,
        fontWeight: "bold",
        fontSize: width("2.1%"),
      },
      projectClassHeading: {
        color: theme.colors.backdrop,
        fontSize: width("2.1%"),
      },
      projectClassText: {
        color: theme.colors.text,
        fontWeight: "bold",
        fontSize: width("2.1%"),
      },
      rightContainer: {
        flexDirection: "column",
        justifyContent: "space-around",
        width: "50%",
        paddingVertical: height(1),
      },
    });
  return React.useMemo(() => styles(), [isDark, height(1), width(1)]);
};
