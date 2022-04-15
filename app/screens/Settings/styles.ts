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
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      },
      title: {
        fontWeight: "bold",
        color: colors.primary,
        fontSize: width("2%"),
      },

      inventoryView: {
        width: width("100%"),
        // backgroundColor: theme.colors.background,
        justifyContent: "space-between",
        // flexDirection: "row",
        padding: width("3%"),
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
        height: height("3%"),
        width: width("25%"),
        flexWrap: "wrap",
        fontSize: width("2%"),
        fontWeight: "bold",
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
    });
  return React.useMemo(() => styles(), [isDark]);
};
