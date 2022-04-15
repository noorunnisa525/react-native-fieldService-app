import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconFont from "react-native-vector-icons/FontAwesome";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "../utils/dimensionUtil";
interface Props {
  title?: string;
  onPress: () => void;
}
const WorkOrderHeader: React.FC<Props> = (props) => {
  const dimensions = useWindowDimensions();
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: theme.colors.background,
        width: width("100%"),
        height: height("8%"),
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={props.onPress}
          style={{ marginLeft: width("2%") }}
        >
          <Icon
            name="arrow-back-ios"
            size={width("3%")}
            color={theme.colors.text}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: "bold",
            fontSize: width("3%"),
            marginLeft: width("2%"),
          }}
        >
          {props.title}
        </Text>
      </View>

      <View style={{ flexDirection: "row", marginRight: width("2%") }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{ marginLeft: width("2%") }}
        >
          <IconFont
            name="filter"
            size={width("3%")}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default WorkOrderHeader;
