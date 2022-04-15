import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  useWindowDimensions,
  TextInput,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "app/utils/dimensionUtil";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/slice/index";
import moment from "moment";
interface Props {
  title?: string;
  itemNumber?: string;
  itemDesc?: string;
  style: ViewStyle;
  bachNumb: string;
  qty: string;
  date: string;
  type: "issue" | "replace";
}
const SearchListCard: React.FC<Props> = (props) => {
  const width = getPercentageWidth();
  const height = getPercentageHeight();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const dimensions = useWindowDimensions();
  const styles = useStyle();
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text numberOfLines={2} style={styles.heading}>
          {`Item#`}{" "}
          <Text style={[styles.heading, { color: theme.colors.text }]}>
            {props?.itemNumber}
          </Text>
        </Text>
        <Text
          numberOfLines={2}
          style={[styles.description, { color: theme.colors.placeholder }]}
        >
          Bach No# <Text style={styles.description}>{props?.bachNumb}</Text>
        </Text>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomHeadingView}>
            <Text style={styles.bottomHeading}>Qty:</Text>
            <Text style={styles.bottomValue}>{props.qty}</Text>
          </View>
          <View style={styles.bottomHeadingView}>
            <Text style={styles.bottomHeading}>
              {props.type == "issue" ? "Issue Date:" : "Replace Date:"}
            </Text>
            <Text style={styles.bottomValue}>
              {moment(props.date).format("MM/DD/YYYY")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SearchListCard;

export const useStyle = () => {
  const dimensions = useWindowDimensions();
  const { colors } = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const styles = () =>
    StyleSheet.create({
      container: {
        borderColor: colors.text,
        borderWidth: 1,
        flexDirection: "row",
        height: width("20%"),
        marginTop: height(3),
        paddingHorizontal: width("2%"),
        paddingVertical: height(3),
        borderRadius: height("1.5%"),
        backgroundColor: colors.borderColor,
        // backgroundColor: 'red',
      },
      heading: {
        fontWeight: "bold",
        fontSize: width("2.5%"),
        color: colors.placeholder,
        flexWrap: "wrap",
        paddingBottom: height(1),
      },
      description: {
        fontWeight: "bold",
        fontSize: width("2.5%"),
        color: colors.text,
        flexWrap: "wrap",
        paddingTop: height("1%"),
      },
      bottomContainer: {
        flexDirection: "row",
        paddingTop: height("1.5"),
      },
      bottomHeadingView: {
        flexDirection: "column",
        width: "50%",
      },
      bottomHeading: {
        fontWeight: "bold",
        fontSize: width("1.5%"),
        color: colors.placeholder,
        flexWrap: "wrap",
      },
      bottomValue: {
        borderColor: colors.placeholder,
        color: colors.text,
        fontSize: width("2.5%"),
      },
    });
  return React.useMemo(() => styles(), [isDark, height(1), width(1)]);
};
