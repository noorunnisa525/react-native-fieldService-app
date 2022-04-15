import React from "react";
import {
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import { useTheme } from "react-native-paper";

import {
  getPercentageWidth,
  getPercentageHeight,
} from "app/utils/dimensionUtil";
import { useSelector } from "react-redux";
import { RootState } from "../../store/slice/index";
interface Props {
  title?: string;
  iconName?: string;
  image?: string;
  imageStyle?: string;
  onPress?: () => void;
}
const ServiceButton: React.FC<Props> = (props) => {
  const styles = useStyle();
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image source={props.image} style={styles.image} resizeMode="contain" />

      <Text numberOfLines={1} style={styles.title}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
export default ServiceButton;

export const useStyle = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const styles = () =>
    StyleSheet.create({
      container: {
        shadowColor: theme.colors.borderShow,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 3.22,
        elevation: 4,
        height: windowHeight > windowWidth ? height("12%") : height("25%"),
        width: windowHeight > windowWidth ? width("35%") : width("40.1%"),
        backgroundColor: theme.colors.background,
        borderRadius: 20,
        borderWidth: theme.dark ? height("0.07") : 0,
        borderColor: theme.colors.backdrop,
        margin: width("0.7%"),
        alignItems: "center",
        justifyContent: "center",
      },
      image: {
        height: height("7"),
        width: width("20"),
      },
      title: {
        fontSize: width("2.2%"),
        color: theme.colors.text,
        marginTop: height("0.2%"),
        textAlign: "center",
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};
