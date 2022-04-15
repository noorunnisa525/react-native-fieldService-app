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
import * as appActions from "../../store/slice/appSlice";
import IconIon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "../../utils/dimensionUtil";
import { useDispatch } from "react-redux";
const RowWorkOrder: React.FC = (props) => {
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
        width: width("100%"),
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.text,
        borderWidth: height("0.02%"),
        flexDirection: "row",
        padding: width("2%"),
      }}
    >
      <View style={{ width: width("25%") }}>
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
            flexWrap: "wrap",
          }}
        >
          {props.data[1]}
        </Text>
      </View>
      <View style={{ width: width("25%") }}>
        <Text
          numberOfLines={2}
          style={{
            fontWeight: "bold",
            fontSize: width("2.5%"),
            color: theme.colors.text,
            flexWrap: "wrap",
          }}
        >
          {props.data[2]}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            fontWeight: "bold",
            fontSize: width("2.5%"),
            color: theme.colors.text,
          }}
        >
          {props.data[3]}
        </Text>
      </View>
      <View style={{ width: width("20%"), alignItems: "flex-end" }}>
        <Menu>
          <MenuTrigger>
            <Icon name="tools" size={height("3%")} color={theme.colors.text} />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionWrapper: { padding: height("2%") },
              optionText: { fontSize: width("3%") },
            }}
          >
            <MenuOption
              onSelect={() => {
                dispatch(
                  appActions.addData({
                    workOrder: props.data[0],
                    description: props.data[1],
                    location: props.data[2],
                  })
                );
                // navigation.navigate("TaskDetail" as never);
              }}
              text="View Work Order"
            />
            <MenuOption onSelect={() => {}} text="Issue Material" />
            <MenuOption onSelect={() => {}} text="Time Entry" />
            <MenuOption onSelect={() => {}} text="View Documents" />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};
export default RowWorkOrder;
