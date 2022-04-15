import React from "react";
import { View, Text, FlatList, ScrollView, Dimensions } from "react-native";
import { useStyle } from "./styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../store/actions/loginAction";
import { useTheme } from "react-native-paper";
import {
  getPercentageHeight,
  getPercentageWidth,
} from "./../../utils/dimensionUtil";
import RowHeader from "../../components/RowHeader";
import RowWorkOrder from "../../components/RowWorkOrder";
import WorkOrderHeader from "../../headers/WorkOrderHeader";
import { useNavigation } from "@react-navigation/core";
const WorkOrder: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const mockData = [
    ["WHSA121", "HANSON BUILDING", "ISD"],
    ["ALSA121", "HAIER ORG LTD", "ISD"],
    ["ALSA121", "HAIER ORG LTD", "ISD"],
    ["ALSA121", "HAIER ORG LTD", "ISD"],
  ];
  const onTab = () => {
    dispatch(userData());
  };
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const theme = useTheme();
  return (
    <>
      <WorkOrderHeader
        title="Work order selection"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.container}
      >
        <View
          style={{
            width: width("100%"),
            backgroundColor: theme.colors.secondary,
            borderColor: theme.colors.background,
            borderWidth: height("0.04%"),
            padding: width("2%"),
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: width("2.5%"),
              color: theme.colors.title,
            }}
          >
            Status: Work in progress
          </Text>
        </View>
        <RowHeader data={["WO#", "DESC", "LOCATION", "EQUIPMENT"]} />

        <FlatList
          nestedScrollEnabled={true}
          data={mockData}
          renderItem={({ item }) => <RowWorkOrder data={item} />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
        />

        {/* second portion */}
        <View
          style={{
            width: width("100%"),
            backgroundColor: theme.colors.secondary,
            borderColor: theme.colors.background,
            borderWidth: height("0.04%"),
            padding: width("2%"),
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: width("2.5%"),
              color: theme.colors.title,
            }}
          >
            Status: Assigned
          </Text>
        </View>
        <RowHeader data={["WO#", "DESC", "LOCATION", "EQUIPMENT"]} />

        <FlatList
          nestedScrollEnabled={true}
          data={mockData}
          contentContainerStyle={styles.flatList}
          renderItem={({ item }) => <RowWorkOrder data={item} />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
        />

        {/* third portion */}
        <View
          style={{
            width: width("100%"),
            backgroundColor: theme.colors.secondary,
            borderColor: theme.colors.background,
            borderWidth: height("0.04%"),
            padding: width("2%"),
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: width("2.5%"),
              color: theme.colors.title,
            }}
          >
            Status: Completed (Past 7 days)
          </Text>
        </View>
        <RowHeader data={["WO#", "DESC", "LOCATION", "EQUIPMENT"]} />

        <FlatList
          nestedScrollEnabled={true}
          data={mockData}
          contentContainerStyle={styles.flatList}
          renderItem={({ item }) => <RowWorkOrder data={item} />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
        />
      </ScrollView>
    </>
  );
};

export default WorkOrder;
