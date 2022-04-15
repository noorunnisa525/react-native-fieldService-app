import React from "react";
import { Dimensions, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import IconIon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  getPercentageHeight,
  getPercentageWidth,
} from "app/utils/dimensionUtil";
import { useStyle } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  workOrder?: string | undefined;
  status: "INPRG" | "RDYASSIGN" | "Completed";
  client?: string | undefined;
  location?: string | undefined;
  equipmentId?: string | undefined;
  serviceOrderNo?: string | undefined;
  custName?: string | undefined;
  onPress?: () => void;
}

const WorkOrderRow: React.FC<Props> = (props) => {
  const height = getPercentageHeight();
  const styles = useStyle();
  const { onPress = () => {} } = props;
  const width = getPercentageWidth();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.workOrderRowLine} />
      <View style={styles.workOrderRowBox}>
        <View
          style={{
            backgroundColor:
              props.status === "RDYASSIGN"
                ? "red"
                : props.status === "INPRG"
                ? "blue"
                : props.status === "Completed"
                ? "green"
                : "transparent",

            width: width("2%"),
            borderBottomStartRadius: height("2%"),
            borderTopStartRadius: height("2%"),
            marginRight: width("1%"),
          }}
        />
        {/* Views for texts in first row */}
        <View style={styles.workOrderRowText}>
          <View style={styles.colum}>
            <Text style={styles.workOrderTextHeading}>WO#</Text>
            <Text style={styles.workOrderText}>{props.workOrder}</Text>
          </View>
          <View style={styles.colum}>
            <Text style={styles.projectClassHeading}>Project Class</Text>
            <Text style={styles.projectClassText} numberOfLines={1}>
              {props.serviceOrderNo}
            </Text>
          </View>
          <View style={styles.colum}>
            <Text style={styles.heading}>LOCATION</Text>
            <Text style={styles.headerValue} numberOfLines={1}>
              {props.location}
            </Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.rowCenter}>
            <Icon
              name="book"
              color={theme.colors.backdrop}
              size={windowHeight > windowWidth ? height("2%") : height("3%")}
              style={{ marginRight: width("0.5%") }}
            />
            <View style={styles.colum}>
              <Text style={styles.heading}>DESC</Text>
              <Text style={styles.headerValue} numberOfLines={2}>
                {props.client}
              </Text>
            </View>
          </View>
          <View style={styles.rowCenter}>
            <IconIon
              name="person-outline"
              color={theme.colors.backdrop}
              size={windowHeight > windowWidth ? height("2%") : height("3%")}
              style={{ marginRight: width("0.5%") }}
            />
            <View style={styles.colum}>
              <Text style={styles.heading}>CustName</Text>
              <Text style={styles.headerValue} numberOfLines={1}>
                {props.custName}
              </Text>
            </View>
          </View>

          <View style={styles.rowCenter}>
            <IconIon
              name="md-settings-outline"
              color={theme.colors.backdrop}
              size={windowHeight > windowWidth ? height("2%") : height("3%")}
              style={{ marginRight: width("0.5%") }}
            />
            <View style={styles.colum}>
              <Text style={styles.heading}>EQUIPMENT</Text>
              <Text style={styles.headerValue}>{props.equipmentId}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default WorkOrderRow;
