import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPercentageHeight } from "../../utils/dimensionUtil";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import IssueMaterialHeader from "../../headers/IssueMaterialHeader";
import * as euipmentListAction from "app/store/actions/euipmentListAction";
import { useIsFocused } from "@react-navigation/core";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useStyle } from "./styles";
import StandardButton from "../../components/StandardButton";
import SearchListEquipmentCard from "app/components/SearchListEquipmentCard/SearchListEquipmentCard";
import addEquipment from "app/services/addEquipment";
import { RootState } from "app/store/slice";
import { disableLoader, enableLoader } from "app/store/slice/loadingSlice";
import { enableSnackBar } from "app/store/slice/snackbarSlice";

const TransferEquipment: React.FC = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const equipmentList = useSelector(
    (state: RootState) => state?.app?.equipmentList
  );
  const appLoading = useSelector((state: RootState) => state.loading.loading);

  const styles = useStyle();
  const height = getPercentageHeight();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const route = useRoute();
  const data = route?.params;
  const [selectedCardItem, setSelectedCardItem] = useState([]);
  const truckID = useSelector((state: RootState) => state.user.truckID);
  const [searchEquipment, setSearchEquipment] = useState([]);

  useEffect(() => {
    if (!Array.isArray(equipmentList) || equipmentList.length == 0) {
      onRefresh();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && Array.isArray(equipmentList)) {
      onSearch(search);
    }
    return () => {
      setSearch("");
    };
  }, [equipmentList, isFocused]);
  const onRefresh = () => {
    dispatch(euipmentListAction.requestEquipmentList(""));
  };

  const addCard = (item) => {
    let temp = {
      ...item,
      assetPosition_ID: item.assetPosition_ID,
      serviceOrderNo: data?.item?.serviceOrderNo,
      projectNo: data.item?.projectNo ? data?.item?.projectNo : "",
      dateCreated: new Date(),
      transferType: item?.transferType ? item?.transferType : "Issue",
      crewId: data?.item?.crewId,
      truckId: truckID ? truckID : "",
    };
    const found = selectedCardItem?.find(
      (element) => element.equip_ID === item.equip_ID
    );

    if (!found) {
      setSelectedCardItem((prv) => prv.concat(temp));
    }
  };

  const onSearch = (value: string) => {
    if (value != "") {
      const equipment = equipmentList.filter((data) => {
        if (data?.equip_ID?.toLowerCase().includes(value.toLowerCase())) {
          return data;
        }
      });

      setSearchEquipment(equipment);
    } else {
      setSearchEquipment(equipmentList);
    }

    setSearch(value);
  };
  const removeCard = (equip_ID) => {
    const data = selectedCardItem?.filter(
      (element) => element.equip_ID !== equip_ID
    );

    setSelectedCardItem(data);
  };
  const onSubmit = async () => {
    try {
      dispatch(enableLoader());
      let response = await addEquipment(selectedCardItem);
      if (response.status == 200) {
        dispatch(enableSnackBar("Data successfully added"));
        dispatch(disableLoader());
        navigation.goBack();
      } else {
        dispatch(enableSnackBar(""));
      }
    } catch (error) {
      dispatch(enableSnackBar(""));

      dispatch(disableLoader());
    }
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.listComponent}>
        {<Text style={styles.listEmptyComponent}>No Card Available</Text>}
      </View>
    );
  };
  const onPressHeader = () => {
    navigation.navigate("TaskDetail", data);
  };
  const ListSearchedEmptyComponent = () => {
    return (
      <View style={styles.listComponent}>
        {<Text style={styles.listEmptyComponent}>No data Found</Text>}
      </View>
    );
  };
  const renderItemSearchItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          addCard(item);
        }}
        style={styles.searchCardContainer}
      >
        <View style={styles.searchMainContainer}>
          <Text style={styles.searchCardHeading}>
            Equip ID#{" "}
            <Text style={styles.searchDescription}>{item.equip_ID}</Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.assetsText}>status</Text>

          <StandardButton
            title={item.equip_Status}
            viewStyles={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
        <Text style={styles.equipmentDescription}>
          {item.equip_Description}
        </Text>
        <View style={styles.row}>
          <Text style={styles.assetsText}>
            {`Equip Class \n`}
            <Text style={styles.assetsPositionText}>{item.equip_Class}</Text>
          </Text>
          <Text style={styles.assetsText}>
            {`Asset Position \n`}
            <Text style={styles.assetsPositionText}>{item.asset_Position}</Text>
          </Text>
        </View>
        {/* item={item.Item} */}
      </TouchableOpacity>
    );
  };

  const renderSelectedItem = ({ item, index }) => {
    const onChangeStatus = (status) => {
      const selectedData = { ...item };
      selectedData["transferType"] = status;
      const data = [...selectedCardItem];
      data[index] = selectedData;
      setSelectedCardItem(data);
    };
    return (
      <SearchListEquipmentCard
        style={{
          marginBottom: height("2%"),
        }}
        itemNumber={item?.equip_ID}
        itemDesc={item?.equip_Description}
        asset={item?.equip_Class}
        assetPosition={item?.asset_Position}
        onPressIcon={() => removeCard(item?.equip_ID)}
        status={item?.equip_Status}
        onChangeStatus={onChangeStatus}
      />
    );
  };
  return (
    <View style={styles.mainContainer}>
      <IssueMaterialHeader
        title={`Transfer Equipment ${data.item?.projectNo}`}
        onPress={onPressHeader}
        onSubmit={onSubmit}
      />

      <View style={styles.container}>
        <View style={styles.inventoryView}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.searchView}>
              <View style={styles.searchPlaceholder}>
                <Icon name="search1" onPress={onRefresh} size={height("3%")} />

                <TextInput
                  placeholder="Search Equip Id..."
                  placeholderTextColor={"black"}
                  style={styles.placeholderText}
                  value={search}
                  onChangeText={onSearch}
                  onSubmitEditing={onSearch}
                />
              </View>

              <FlatList
                refreshing={appLoading ? true : false}
                onRefresh={onRefresh}
                nestedScrollEnabled={true}
                data={Array.isArray(searchEquipment) ? searchEquipment : []}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItemSearchItem}
                ListEmptyComponent={ListSearchedEmptyComponent}
                style={{
                  padding: height("2%"),
                }}
                listKey={(item, index) => `_key${index.toString()}`}
                keyExtractor={(item, index) => `_key${index.toString()}`}
              />
            </View>

            <View style={styles.searchListCard}>
              <Text style={styles.inventoryText} numberOfLines={2}>
                Search equipment in left panel. Tap to add them to issue and
                retire.
              </Text>
              <FlatList
                refreshing={false}
                onRefresh={onRefresh}
                nestedScrollEnabled={true}
                data={selectedCardItem}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={renderSelectedItem}
                ListEmptyComponent={ListEmptyComponent}
                listKey={(item, index) => `_key${index.toString()}`}
                keyExtractor={(item, index) => `_key${index.toString()}`}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransferEquipment;
