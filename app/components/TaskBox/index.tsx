import React from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import IconIon from "react-native-vector-icons/Ionicons";
import { RootState } from "../../store/slice/index";

import {
  getPercentageWidth,
  getPercentageHeight,
} from "app/utils/dimensionUtil";
import { useSelector } from "react-redux";
interface Props {
  taskID: string;
  clientName: string;
  address: string;
  secondTaskID: string;
}
const TaskBox: React.FC<Props> = (props) => {
  const width = getPercentageWidth();
  const height = getPercentageHeight();
  const theme = useTheme();
  const styles = useStyle();
  return (
    <Pressable style={styles.container}>
      <Text style={styles.heading}>{props.taskID}</Text>
      <Text style={styles.description}>{props.clientName}</Text>
      <View style={styles.rowCenter}>
        <IconIon
          name="book-outline"
          size={20}
          style={{ marginRight: 3 }}
          color={theme.colors.backdrop}
        />
        <Text style={{ color: theme.colors.backdrop }}>{props.address}</Text>
      </View>
      <View style={styles.rowCenter}>
        <IconIon
          name="settings"
          size={20}
          style={{ marginRight: 3 }}
          color={theme.colors.backdrop}
        />
        <Text style={{ color: theme.colors.backdrop }}>
          {props.secondTaskID}
        </Text>
      </View>
    </Pressable>
  );
};
export default TaskBox;

export const useStyle = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const styles = () =>
    StyleSheet.create({
      container: {
        shadowColor: theme.colors.borderShow,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor: theme.colors.background,
        width: width("47%"),
        height: height("15%"),
        borderRadius: 20,
        margin: 10,
        padding: 10,
        justifyContent: "center",
      },
      heading: { color: theme.colors.backdrop, fontSize: width(2.5) },
      description: { fontWeight: "bold", fontSize: 22, marginBottom: 10 },
      rowCenter: { flexDirection: "row", alignItems: "center" },
    });
  return React.useMemo(() => styles(), [isDark]);
};
