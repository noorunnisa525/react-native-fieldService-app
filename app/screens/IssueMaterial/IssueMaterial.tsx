import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "react-native-paper";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "../../utils/dimensionUtil";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import IssueMaterialHeader from "../../headers/IssueMaterialHeader";
import * as topItemsListAction from "app/store/actions/topItemsListAction";
import { useIsFocused } from "@react-navigation/core";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useStyle } from "./styles";
import SearchListCard from "app/components/SearchListCard/SearchListCard";
import * as allItemsAction from "app/store/actions/allItemsAction";
import * as pickListAction from "app/store/actions/pickListAction";
import * as loadingAction from "../../store/slice/loadingSlice";
import StandardButton from "app/components/StandardButton";
import { RootState } from "app/store/slice/index";
import { disableLoader, enableLoader } from "app/store/slice/loadingSlice";
import { enableSnackBar } from "app/store/slice/snackbarSlice";
import issueMaterial from "app/services/issueMaterial";
const IssueMaterialScreen = (props: {
  isSubmit: boolean;
  onSubmit: (value: boolean) => void;
}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state?.app?.topItemList);
  const allItems = useSelector((state: RootState) => state?.app.allItemsList);
  const pickList = useSelector((state: RootState) => state?.app?.pickItemsList);

  const styles = useStyle();
  const width = getPercentageWidth();
  const height = getPercentageHeight();
  const navigation = useNavigation();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const dimensions = useWindowDimensions();
  const route = useRoute();
  const data = route?.params;
  const [filteredData, setFilteredData] = useState(pickList);
  const [selectedCardItem, setSelectedCardItem] = useState([]);
  const truckID = useSelector((state: RootState) => state.user.truckID);
  const [selectedTag, setSelectedTag] = useState<"pickList" | "all" | "top">(
    "pickList"
  );
  function filterByValue(array, value) {
    if (value === "") {
      return items;
    } else {
      return array?.filter(
        (data) =>
          JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    }
  }

  useEffect(() => {
    if (selectedTag == "pickList") {
      setFilteredData(pickList);
    } else if (selectedTag == "top") {
      setFilteredData(items);
    } else {
      setFilteredData(allItems);
    }
  }, [pickList, items, allItems, selectedTag]);

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused, selectedTag]);
  const onRefresh = () => {
    setSearch("");
    if (selectedTag == "pickList") {
      dispatch(pickListAction.requestPickList(data?.projectNo));
    } else if (selectedTag === "all") {
      dispatch(allItemsAction.requestAllItems({}));
    } else {
      dispatch(topItemsListAction.requestTopItemList({}));
    }
  };
  useEffect(() => {
    if (props.isSubmit) {
      onSubmit();
    }
  }, [props.isSubmit]);
  const onClickTopItemList = () => {
    setSelectedTag("top");
  };
  const onClickAllItemList = () => {
    setSelectedTag("all");
  };
  const onClickPickList = () => {
    setSelectedTag("pickList");
  };

  const addCard = (item) => {
    const found = selectedCardItem?.find(
      (element) => element.itemnmbr === item.itemnmbr
    );
    if (!found) {
      let data = {
        itemnmbr: item.itemnmbr,
        itemdesc: item.itemdesc,
        construct: item.planQty ? item.planQty.toString() : "0",
        replace: item.replace ? item.replace : 0,
        planQty: item.planQty ? item.planQty.toString() : 0,
      };
      setSelectedCardItem((prv) => prv.concat(data));
    }
  };

  const removeCard = (itemnmbr) => {
    const data = selectedCardItem?.filter(
      (element) => element.itemnmbr !== itemnmbr
    );

    setSelectedCardItem(data);
  };
  const onSubmit = async () => {
    props.onSubmit(false);

    if (selectedCardItem.length == 0) {
      return;
    }
    let validateData = selectedCardItem.findIndex((item) => {
      if (parseFloat(item.construct) <= 0 && parseFloat(item.replace) <= 0) {
        return item;
      }
    });

    if (validateData != -1) {
      alert("zero value not allowed for issue and replace");
      return;
    }
    dispatch(loadingAction.enableLoader());

    let postData = {
      serviceOrderDesc: data?.serviceOrderDesc,
      serviceOrderNo: data?.serviceOrderNo,
      cnxStatus: data?.cnxStatus,
      cnxStatusDate: data?.cnxStatusDate,
      projectNo: data?.projectNo,
      locAssetPositionDesc: data?.locAssetPositionDesc,
      crewId: data?.crewId,
      truckId: truckID,
      projectManagerId: data?.projectManagerId,
      userId: data?.userId,
      billToCustName: data?.billToCustName,
      equipmentId: data?.equipmentId,
      lineItems: selectedCardItem,
    };
    try {
      dispatch(enableLoader());
      let response = await issueMaterial(postData);
      if (response.status == 200) {
        dispatch(enableSnackBar("Data successfully added"));
        dispatch(disableLoader());
        navigation.goBack();
      } else {
        dispatch(enableSnackBar(""));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(enableSnackBar(""));
      dispatch(disableLoader());
    } finally {
      props.onSubmit(false);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          addCard(item);
        }}
        style={{
          margin: height("0.4%"),
        }}
      >
        <Text
          style={{
            margin: height("0.4%"),
            color: theme.colors.backdrop,
            fontSize: width("1.75%"),
          }}
        >
          {item.itemnmbr?.trim()}
        </Text>
        <Text
          style={{
            margin: height("0.4%"),
            fontSize: width("2%"),
            color: theme.colors.text,
          }}
        >
          {item.itemdesc?.trim()}
        </Text>
      </TouchableOpacity>
    );
  };
  const onSearch = (value) => {
    setSearch(value);
    let abc = filterByValue(
      selectedTag == "all"
        ? allItems
        : selectedTag == "pickList"
        ? pickList
        : items,
      value
    );
    setFilteredData(abc);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inventoryView}>
        <Text style={styles.inventoryText}>
          Search inventory with item numbers. Tap to add them, with their values
          and Submit
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.searchView}>
            <View style={styles.searchPlaceholder}>
              <Icon name="search1" size={width("3%")} />

              <TextInput
                placeholder="Search items..."
                placeholderTextColor={"black"}
                style={styles.placeholderText}
                value={search}
                onChangeText={onSearch}
              />
            </View>
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                paddingTop: "2%",
                paddingLeft: "5%",
              }}
            >
              <StandardButton
                title="PickList"
                onPress={onClickPickList}
                viewStyles={{
                  backgroundColor:
                    selectedTag == "pickList"
                      ? theme.colors.icon
                      : theme.colors.placeholder,
                }}
                textStyle={{
                  color:
                    selectedTag == "pickList"
                      ? theme.colors.background
                      : theme.colors.placeholder,
                }}
              />
              <StandardButton
                title="Top"
                onPress={onClickTopItemList}
                viewStyles={{
                  backgroundColor:
                    selectedTag == "top"
                      ? theme.colors.icon
                      : theme.colors.placeholder,
                }}
                textStyle={{
                  color:
                    selectedTag == "top"
                      ? theme.colors.background
                      : theme.colors.placeholder,
                }}
              />
              <StandardButton
                title="All"
                onPress={onClickAllItemList}
                viewStyles={{
                  backgroundColor:
                    selectedTag == "all"
                      ? theme.colors.icon
                      : theme.colors.placeholder,
                }}
                textStyle={{
                  color:
                    selectedTag == "all"
                      ? theme.colors.background
                      : theme.colors.placeholder,
                }}
              />
            </View>
            <FlatList
              refreshing={false}
              onRefresh={onRefresh}
              nestedScrollEnabled={true}
              data={Array.isArray(filteredData) ? filteredData : []}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
              ListEmptyComponent={() => {
                return (
                  <View style={styles.listComponent}>
                    {
                      <Text
                        style={{
                          color: theme.colors.text,
                          fontWeight: "bold",
                          fontSize: width("2%"),
                        }}
                      >
                        No data Found
                      </Text>
                    }
                  </View>
                );
              }}
              style={{
                padding: height("2%"),
              }}
              listKey={(item, index) => `_key${index.toString()}`}
              keyExtractor={(item, index) => `_key${index.toString()}`}
            />
          </View>

          <View style={styles.searchListCard}>
            <FlatList
              refreshing={false}
              onRefresh={onRefresh}
              nestedScrollEnabled={true}
              data={Array.isArray(selectedCardItem) ? selectedCardItem : []}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <SearchListCard
                    itemNumber={item?.itemnmbr}
                    itemDesc={item?.itemdesc}
                    issueValue={item?.planQty ? item?.planQty.toString() : "0"}
                    onPressIcon={() => removeCard(item.itemnmbr)}
                    onChangeIssueMaterial={(issueMaterial) => {
                      let data = [...selectedCardItem];
                      data[index] = {
                        ...item,
                        construct: issueMaterial,
                      };
                      setSelectedCardItem(data);
                    }}
                    onChangeReplaceText={(replaceMaterial) => {
                      let data = [...selectedCardItem];
                      data[index] = {
                        ...item,
                        replace: replaceMaterial,
                      };
                      setSelectedCardItem(data);
                    }}
                    style={{
                      marginBottom: height("1.5%"),
                    }}
                  />
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={styles.listComponent}>
                    {
                      <Text
                        style={{
                          color: theme.colors.text,
                          fontWeight: "bold",
                          fontSize: width("2%"),
                        }}
                      >
                        No Card Available
                      </Text>
                    }
                  </View>
                );
              }}
              style={{
                padding: height("2%"),
              }}
              listKey={(item, index) => `_key${index.toString()}`}
              keyExtractor={(item, index) => `_key${index.toString()}`}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default IssueMaterialScreen;
