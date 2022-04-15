import React from "react";
import { Image, Text, Pressable, View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import * as appActions from "./../../store/slice/appSlice";
import IconIon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "./../../utils/dimensionUtil";
import { useDispatch } from "react-redux";
const RowMaterialAddition: React.FC = (props) => {
  const width = getPercentageWidth();
  const height = getPercentageHeight();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <View
      style={{
        padding: width("2%"),
      }}
    >
      <Text
        numberOfLines={2}
        style={{
          fontWeight: "bold",
          fontSize: width("2.5%"),
          color: theme.colors.text,
          flexWrap: "wrap",
        }}
      >
        {props.item}
      </Text>
    </View>
  );
};
export default RowMaterialAddition;
