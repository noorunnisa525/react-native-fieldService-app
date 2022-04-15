import React, { useState } from "react";
import {
  Image,
  Text,
  Pressable,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import { useTheme } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import IconIon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "../../utils/dimensionUtil";

const RowMaterialEdit: React.FC = (props) => {
  const width = getPercentageWidth();
  const height = getPercentageHeight();
  const navigation = useNavigation();
  const theme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [construct, setConstruct] = useState("");
  const [replace, setReplace] = useState("");
  return (
    <View
      style={{
        width: width("100%"),
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.text,
        borderWidth: height("0.02%"),
        flexDirection: "row",
        padding: width("2%"),
      }}
    >
      <View style={{ width: width("17%") }}>
        <Text
          numberOfLines={2}
          style={{
            fontWeight: "bold",
            fontSize: width("2.5%"),
            color: theme.colors.text,
            flexWrap: "wrap",
          }}
        >
          {props.data[0]}
        </Text>
      </View>

      <View style={{ width: width("25%") }}>
        <Text
          numberOfLines={2}
          style={{
            fontWeight: "bold",
            fontSize: width("2.5%"),
            color: theme.colors.text,
            width: width("20%"),
            flexWrap: "wrap",
          }}
        >
          {props.data[1]}
        </Text>
      </View>
      <TextInput
        style={{ borderWidth: height("0.1%"), minWidth: width("20%") }}
        onChangeText={(value) => {
          setConstruct(value);
        }}
      />

      <TextInput
        style={{
          borderWidth: height("0.1%"),
          minWidth: width("20%"),
          marginLeft: width("4%"),
        }}
        onChangeText={(value) => {
          setReplace(value);
        }}
      />
      <View style={{ width: width("10%"), alignItems: "flex-end" }}>
        <Icon
          name="delete"
          size={height("4%")}
          onPress={props.onPress}
          color={theme.colors.text}
        />
      </View>
    </View>
  );
};
export default RowMaterialEdit;
