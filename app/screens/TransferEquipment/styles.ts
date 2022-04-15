import { StyleSheet, useWindowDimensions } from "react-native";
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
      mainContainer: {
        height: height(100),
        width: width(100),
        backgroundColor: colors.background,
      },
      container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      },
      title: {
        fontWeight: "bold",
        color: colors.primary,
      },
      assetsText: {
        margin: height("0.4%"),
        color: colors.backdrop,
        fontSize: width("1.75%"),
      },
      assetsPositionText: {
        margin: height("0.4%"),
        color: colors.primary,
        fontWeight: "bold",
        fontSize: width("1.75%"),
      },
      listComponent: {
        alignItems: "center",
        justifyContent: "center",
      },
      inventoryView: {
        width: width("100%"),
        justifyContent: "space-between",
        // flexDirection: "row",
        padding: width("2%"),
      },
      inventoryText: {
        fontWeight: "bold",
        color: colors.text,
        paddingHorizontal: width("2"),
        fontSize: width("2.5"),
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
        width: width("40%"),
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
        height: height("100%"),
        width: width("60%"),
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
      listEmptyComponent: {
        color: colors.text,
        fontWeight: "bold",
        fontSize: width("2%"),
      },
      listComponent: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingTop: 20,
      },
      searchCardContainer: {
        marginBottom: height("2%"),
        borderColor: colors.text,
        borderWidth: 1,
        padding: 4,
        borderRadius: 5,
      },
      searchMainContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      searchCardHeading: {
        color: colors.backdrop,
        fontWeight: "bold",
        fontSize: width("2%"),
      },
      searchDescription: {
        color: colors.text,
        fontWeight: "bold",
        fontSize: width("2%"),
      },
      buttonContainer: {
        flexDirection: "column",
        paddingTop: height(1),
      },
      button: {
        backgroundColor: "#d0f0c0",
        width: width("14"),
        height: height("2.75"),

        justifyContent: "center",
        alignItems: "center",
      },
      buttonText: {
        color: "green",
        textAlign: "center",
      },
      equipmentDescription: {
        margin: height("0.4%"),
        fontWeight: "bold",
        fontSize: width("2%"),
        color: colors.text,
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
    });
  return React.useMemo(() => styles(), [isDark, height(1), width(1)]);
};
