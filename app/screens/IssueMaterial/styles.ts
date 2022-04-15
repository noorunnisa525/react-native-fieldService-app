import { StyleSheet, useWindowDimensions } from "react-native";
import { RootState } from "./../../store/slice";
import { useTheme } from "react-native-paper";
import React from "react";
import { useSelector } from "react-redux";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "../../utils/dimensionUtil";

export const useStyle = () => {
  const dimensions = useWindowDimensions();
  const { colors } = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const styles = () =>
    StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: colors.background,
      },
      container: {
        paddingTop: height(1),
        backgroundColor: colors.background,
        height: height(100),
        width: width(100),
      },
      title: {
        fontWeight: "bold",
        color: colors.primary,
      },
      listComponent: {
        alignItems: "center",
        justifyContent: "center",
      },
      inventoryView: {
        width: width("100%"),
        // backgroundColor: theme.colors.background,
        justifyContent: "space-between",
        // flexDirection: "row",
        paddingHorizontal: width("3%"),
      },
      inventoryText: {
        fontWeight: "bold",
        color: colors.text,

        fontSize: width("2%"),
      },
      searchView: {
        // flexDirection: 'row',
        shadowColor: colors.borderShow,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
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
        alignItems: "center",
      },
      placeholderText: {
        paddingLeft: height("0.75%"),
        height: height("4%"),
        width: width("25%"),
        flexWrap: "wrap",
        fontSize: width("2%"),
        fontWeight: "bold",
        backgroundColor: isDark ? colors.text : colors.accent,
      },
      searchListCard: {
        flex: 1,
        paddingHorizontal: height("1.5%"),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: width("20%"),
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
      row: { flexDirection: "row" },
      tabView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: width(2),
      },
      emptyText: {
        color: colors.text,
        fontWeight: "bold",
        fontSize: width("2%"),
        paddingTop: height("4"),
      },
    });
  return React.useMemo(() => styles(), [isDark, height(1), width(1)]);
};
