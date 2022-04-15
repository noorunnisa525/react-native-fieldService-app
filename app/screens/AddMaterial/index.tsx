import React, { useState } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import { useStyle } from "./styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import WorkDetail from "../../components/WorkDetail";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  getPercentageWidth,
  getPercentageHeight,
} from "./../../utils/dimensionUtil";
import Icon from "react-native-vector-icons/AntDesign";
import RowMaterialAddition from "./../../components/RowMaterialAddition";
import AddMaterialHeader from "../../headers/AddMaterialHeader";
const AddMaterial: React.FC = () => {
  const styles = useStyle();
  const width = getPercentageWidth();
  const navigation = useNavigation();
  const height = getPercentageHeight();
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const _id = useSelector((state: RootState) => state.user.id);
  const order = useSelector((state) => state.app.order);
  const items = useSelector((state) => state.app.item);
  const [filteredData, setFilteredData] = useState(items);
  function filterByValue(array, value) {
    if (value === "") {
      return null;
    } else {
      return array.filter(
        (data) =>
          JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    }
  }
  const TitleBar = () => {
    return (
      <View style={styles.titleBar}>
        <Text style={styles.titleBarHeading}>Item</Text>
        <Text style={styles.description}>Description</Text>
      </View>
    );
  };
  return (
    <>
      <AddMaterialHeader
        title="Add material"
        onPress={() => {
          navigation.navigate("IssueMaterial" as never);
        }}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <WorkDetail
          workOrder={order.workOrder}
          description={order.workOrder}
          projectClass="Mock Project Class"
          customerName="Mock Customer Name"
          locationDescription={order.location}
        />

        <View style={styles.heading}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: width("2.5%"),
              color: theme.colors.title,
            }}
          >
            Item Search. Enter the keyword to search
          </Text>
        </View>
        <View style={styles.textBox}>
          <TextInput
            placeholder="Search keyword or item id"
            style={{
              width: width("90%"),
              margin: height("0.4%"),
              padding: width("2%"),
            }}
            onChangeText={(value) => {
              setFilteredData(filterByValue(items, value));
            }}
          />
          <Icon name="search1" size={height("4%")} />
        </View>
        {/* search results */}
        <View
          style={{
            width: width("100%"),
            backgroundColor: theme.colors.secondary,
            borderColor: theme.colors.text,
            borderWidth: height("0.1%"),
            justifyContent: "space-between",
            flexDirection: "row",
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
            Search Results
          </Text>
        </View>
        <TitleBar />
        <FlatList
          nestedScrollEnabled={true}
          data={filteredData}
          style={{
            borderWidth: height("0.2%"),
            borderColor: theme.colors.backdrop,
            width: width("100%"),
          }}
          renderItem={({ item }) => (
            <RowMaterialAddition
              description={item.Description}
              item={item.Item}
            />
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
        />
        {/* item picklist */}
        <View
          style={{
            width: width("100%"),
            backgroundColor: theme.colors.secondary,
            borderColor: theme.colors.text,
            borderWidth: height("0.1%"),
            justifyContent: "space-between",
            flexDirection: "row",
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
            Item Picklist
          </Text>
        </View>
        <TitleBar />
        <FlatList
          nestedScrollEnabled={true}
          data={items}
          style={{
            borderWidth: height("0.2%"),
            borderColor: theme.colors.backdrop,
            width: width("100%"),
          }}
          renderItem={({ item }) => (
            <RowMaterialAddition
              description={item.Description}
              item={item.Item}
            />
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
        />
        {/* Top 100 */}
        <View
          style={{
            width: width("100%"),
            backgroundColor: theme.colors.secondary,
            borderColor: theme.colors.text,
            borderWidth: height("0.1%"),
            justifyContent: "space-between",
            flexDirection: "row",
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
            Top 100 items
          </Text>
        </View>
        <TitleBar />
        <FlatList
          nestedScrollEnabled={true}
          data={items}
          style={{
            borderWidth: height("0.2%"),
            borderColor: theme.colors.backdrop,
            width: width("100%"),
          }}
          renderItem={({ item }) => (
            <RowMaterialAddition
              description={item.Description}
              item={item.Item}
            />
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

export default AddMaterial;
