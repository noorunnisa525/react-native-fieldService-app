import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
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
const TaskDetailHeader: React.FC<Props> = (props) => {
  const dimensions = useWindowDimensions();
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const theme = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle={theme.colors.barStyle}
      />

      <SafeAreaView
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: theme.colors.primary,
          width: width("100%"),
          height: height("8%"),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              marginLeft: width("2%"),
            }}
          >
            <Icon
              name="arrow-back"
              size={width("3%")}
              color={theme.colors.background}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: theme.colors.background,
              fontWeight: "bold",
              fontSize: width("3%"),
              marginLeft: width("2%"),
            }}
          >
            {props.title}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};
export default TaskDetailHeader;
