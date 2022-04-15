import React from "react";
import { Image, Text, Pressable, View } from "react-native";
import { useTheme } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconIon from "react-native-vector-icons/Ionicons";

import {
  getPercentageWidth,
  getPercentageHeight,
} from "../../utils/dimensionUtil";

const RowHeader: React.FC = (props) => {
  const width = getPercentageWidth();
  const height = getPercentageHeight();
  const theme = useTheme();
  return (
    <View
      style={{
        width: width("100%"),
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.background,
        borderWidth: height("0.02%"),
        justifyContent: "space-between",
        flexDirection: "row",
        padding: width("2%"),
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: width("2.5%"),
          color: theme.colors.title,
        }}
      >
        {props.data[0]}
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: width("2.5%"),
          color: theme.colors.title,
        }}
      >
        {props.data[1]}
      </Text>
      {props.data[2] ? (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: width("2.5%"),
            color: theme.colors.title,
          }}
        >
          {props.data[2]}
        </Text>
      ) : null}
      <Text
        style={{
          fontWeight: "bold",
          fontSize: width("2.5%"),
          color: theme.colors.title,
        }}
      >
        {props.data[3]}
      </Text>
      {props.data[4] ? (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: width("2.5%"),
            color: theme.colors.title,
          }}
        >
          {props.data[4]}
        </Text>
      ) : null}
    </View>
  );
};
export default RowHeader;
