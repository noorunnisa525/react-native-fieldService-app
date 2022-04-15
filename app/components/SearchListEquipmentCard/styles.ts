import { StyleSheet, useWindowDimensions } from "react-native";
import { RootState } from "./../../store/slice";
import { useTheme } from "react-native-paper";
import React from "react";
import { useSelector } from "react-redux";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "app/utils/dimensionUtil";

export const useStyle = () => {
  const dimensions = useWindowDimensions();
  const { colors } = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const styles = () =>
    StyleSheet.create({
      mainContainer: {
        width: width("50%"),
        flexDirection: "row",
      },
      leftContainer: {
        flexDirection: "column",
        width: width("40%"),
      },
      heading: {
        fontWeight: "bold",
        fontSize: width("2.5%"),
        color: colors.placeholder,
        flexWrap: "wrap",
      },
      description: {
        fontWeight: "bold",
        fontSize: width("2.5%"),
        color: colors.text,
      },
      boldHeading: {
        fontWeight: "bold",
        fontSize: width("2.15%"),
        color: colors.text,
        flexWrap: "wrap",
        paddingTop: width("0.15%"),
      },
      container: {
        width: width("50"),
        borderColor: colors.text,
        borderWidth: 1,
        flexDirection: "row",
        padding: width("2%"),
        shadowColor: colors.borderShow,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 3.22,
        elevation: 4,
        borderRadius: height("1.5%"),
        backgroundColor: colors.borderColor,
        flexShrink: 1,
        // backgroundColor: 'red',
      },
      title: {
        fontWeight: "bold",
        color: colors.primary,
      },
      assetsText: {
        marginBottom: height("0.4%"),
        color: colors.backdrop,
        fontSize: width("1.75%"),
      },
      assetsPositionText: {
        margin: height("0.4%"),
        color: colors.primary,
        fontWeight: "bold",
        fontSize: width("1.75%"),
      },
      innerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: width("1"),
      },
      buttonContainer: {
        flexDirection: "row",
        paddingTop: height("0.5"),
        justifyContent: "space-between",
      },
      inventoryView: {
        width: width("100%"),
        // backgroundColor: theme.colors.background,
        justifyContent: "space-between",
        // flexDirection: "row",
        padding: width("2%"),
      },
      inventoryText: {
        fontWeight: "bold",
        color: colors.text,

        fontSize: width("2%"),
      },
      button: {
        width: width("22"),
        height: height("5"),
        borderWidth: width("0.1"),
        borderColor: colors.placeholder,
        marginRight: "4%",
        borderRadius: 15,
      },
      searchView: {
        // flexDirection: 'row',
        shadowColor: colors.borderShow,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 3.22,
        elevation: 4,

        borderTopLeftRadius: height("1.5%"),
        borderBottomLeftRadius: height("1.5%"),
        marginTop: height("2%"),
        width: width("37%"),
        height: height("80%"),
        backgroundColor: colors.borderColor,
        // backgroundColor: 'red',
      },
      searchPlaceholder: {
        flexDirection: "row",
        borderBottomWidth: height("0.1%"),
        padding: height("1.5%"),
      },
      placeholderText: {
        paddingLeft: height("0.75%"),
        height: height("4%"),
        width: width("25%"),
        flexWrap: "wrap",
        fontSize: width("2%"),
        fontWeight: "bold",
      },
      searchListCard: {
        flex: 1,
        paddingHorizontal: height("2%"),
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: width("10%"),
      },
      checkboxTextStyle: {
        // flexWrap: 'wrap',
        // margin: height('0.4%'),
        marginLeft: "-3%",
        color: colors.backdrop,
        fontSize: width("2%"),
      },
      checkBox1ContainerStyle: {
        flexShrink: 1,
        width: width("7%"),
        width: width("12%"),
        height: height("4%"),
        backgroundColor: colors.borderColor,
        borderColor: colors.borderColor,
      },

      checkBox2ContainerStyle: {
        flexShrink: 1,
        width: width("7%"),
        height: height("4%"),
        backgroundColor: colors.borderColor,
        borderColor: colors.borderColor,
      },

      checkBox3ContainerStyle: {
        flexWrap: "wrap",
        width: width("7%"),
        height: height("4%"),
        backgroundColor: colors.borderColor,
        borderColor: colors.borderColor,
      },
    });
  return React.useMemo(() => styles(), [isDark, height(1), width(1)]);
};
