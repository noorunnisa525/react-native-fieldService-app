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

import { useStyle } from "./styles";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import StandardButton from "../StandardButton";
interface Props {
  title?: string;
  itemNumber?: string;
  itemDesc?: string;
  onPressIcon?: () => void;
  onChangeReplaceText?: () => void;
  onChangeIssueMaterial?: () => void;
  onChangeStatus: (data: string) => void;
  asset?: string;
  assetPosition?: string;
  status?: string;
  style?: ViewStyle;
}
const SearchListEquipmentCard: React.FC<Props> = (props) => {
  const width = getPercentageWidth();
  const height = getPercentageHeight();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const dimensions = useWindowDimensions();
  const styles = useStyle();
  const [issueStatus, setIssueStatus] = useState("ISSUE");
  useEffect(() => {
    props.onChangeStatus(issueStatus.toLowerCase());
  }, [issueStatus]);
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text numberOfLines={2} style={styles.heading}>
                Equip ID#{" "}
                <Text style={styles.description}>{props?.itemNumber}</Text>
              </Text>
              <Text style={styles.boldHeading}>{props?.itemDesc}</Text>
            </View>
            <TouchableOpacity
              onPress={props.onPressIcon}
              style={{ width: width("25%") }}
            >
              <Icon
                name={"close"}
                size={width("7%")}
                color={theme.colors.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.assetsText}>
              {`Equip Class \n`}
              <Text style={styles.assetsPositionText}>{props?.asset}</Text>
            </Text>
            <Text style={styles.assetsText}>
              {`Asset Position \n`}
              <Text style={styles.assetsPositionText}>
                {props?.assetPosition}
              </Text>
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <StandardButton
              title="ISSUE"
              viewStyles={[
                styles.button,
                {
                  backgroundColor:
                    issueStatus == "ISSUE"
                      ? theme.colors.icon
                      : theme.colors.borderColor,
                },
              ]}
              textStyle={{ color: theme.colors.primary }}
              onPress={() => {
                setIssueStatus("ISSUE");
              }}
            />
            <StandardButton
              title="RETIRE"
              viewStyles={[
                styles.button,
                {
                  backgroundColor:
                    issueStatus == "RETIRE"
                      ? theme.colors.icon
                      : theme.colors.borderColor,
                },
              ]}
              textStyle={{ color: theme.colors.primary }}
              onPress={() => {
                setIssueStatus("RETIRE");
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default SearchListEquipmentCard;
