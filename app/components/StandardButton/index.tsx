import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useStyle } from "./style";
import { Props } from "./types";
const StdButton: React.FC<Props> = (props) => {
  const styles = useStyle();
  return (
    <TouchableOpacity style={[styles.view,props.viewStyles]} onPress={props.onPress}>
      {props.icon ? (
        <Icon
          style={styles.icon}
          name={props.icon}
          size={24}
          color={props.iconColor ? props.iconColor : "black"}
        />
      ) : null}
      {props.image ? <Image source={props.image} /> : null}
      <Text style={[styles.text,props.textStyle]}>{props.title}</Text>
      {props.withActivityIndicator ? <ActivityIndicator /> : null}
    </TouchableOpacity>
  );
};
export default StdButton;
