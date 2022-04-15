import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  useWindowDimensions,
  TextInput,
  ViewStyle,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "../../utils/dimensionUtil";

import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
interface Props {
  title?: string;
  itemNumber?: string;
  itemDesc?: string;
  onPressIcon?: () => void;
  onChangeReplaceText: (text: string) => void;
  onChangeIssueMaterial: (text: string) => void;
  replaceMaterial: string;
  issueMaterial: string;
  issueValue: string;
  style: ViewStyle;
}
const SearchListCard: React.FC<Props> = (props) => {
  const width = getPercentageWidth();
  const height = getPercentageHeight();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const dimensions = useWindowDimensions();
  const [replaceValue, setReplaceValue] = useState("0");
  const [issueValue, setIssueValue] = useState(
    props.issueValue ? props.issueValue : "0"
  );
  useEffect(() => {
    setIssueValue(props.issueValue);
  }, [props.issueValue]);
  return (
    <View
      style={{
        width: width("50%"),
        borderWidth: 1,
        flexDirection: "row",
        borderColor: theme.colors.text,
        padding: width("4%"),
        shadowColor: theme.colors.borderShow,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 3.22,
        elevation: 4,
        borderRadius: height("1.5%"),
        backgroundColor: theme.colors.borderColor,
        flexShrink: 1,
        paddingBottom: 10,
        ...props.style,
      }}
    >
      <View
        style={{
          width: width("35%"),
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            width: width("35%"),
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "bold",
              fontSize: width("2.5%"),

              color: theme.colors.placeholder,
              flexWrap: "wrap",
            }}
          >
            {props?.itemNumber}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "bold",
              fontSize: width("2.5%"),
              color: theme.colors.text,
              flexWrap: "wrap",
              paddingTop: width("0.5%"),
            }}
          >
            {props?.itemDesc}
          </Text>
          <View
            style={{
              flexDirection: "row",
              paddingTop: height("1"),
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: width("1.5%"),
                  color: theme.colors.placeholder,
                  flexWrap: "wrap",
                  marginLeft: width("1.5%"),
                }}
              >
                Issue
              </Text>
              <TextInput
                value={issueValue}
                style={{
                  borderRadius: width("1.5%"),
                  paddingLeft: width("2%"),
                  justifyContent: "center",
                  width: width("20%"),
                  height: height("4%"),
                  borderColor: theme.colors.placeholder,
                  borderWidth: 1,
                  fontSize: width("2.5%"),
                  color: theme.colors.text,
                }}
                // value={issueMaterial}
                keyboardType={"numeric"}
                placeholder="Issue"
                onChangeText={(text) => {
                  var pattern = /^\d+$/;
                  if (text == "" || pattern.test(text)) {
                    setIssueValue(text);
                    props.onChangeIssueMaterial(text);
                  }
                }}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: width("1.5%"),
                  color: theme.colors.placeholder,
                  flexWrap: "wrap",
                  marginLeft: width("3%"),
                }}
              >
                Replace
              </Text>
              <TextInput
                value={replaceValue}
                style={{
                  borderRadius: width("1.5%"),
                  paddingLeft: width("2%"),
                  justifyContent: "center",
                  width: width("22%"),
                  height: height("4%"),
                  borderColor: theme.colors.placeholder,
                  borderWidth: 1,
                  fontSize: width("2.5%"),
                  marginLeft: width("2%"),
                  color: theme.colors.text,
                }}
                // value={props.replaceMaterial}
                keyboardType={"numeric"}
                placeholder={"0"}
                onChangeText={(text) => {
                  var pattern = /^\d+$/;
                  if (text == "" || pattern.test(text)) {
                    setReplaceValue(text);
                    props.onChangeReplaceText(text);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={props.onPressIcon}
        style={{ width: width("45%") }}
      >
        <Icon name={"close"} size={width("6%")} color={theme.colors.icon} />
      </TouchableOpacity>
    </View>
  );
};
export default SearchListCard;
