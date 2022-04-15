import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "react-native-paper";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "../../utils/dimensionUtil";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/core";

import { useStyle } from "./styles";
import MaterialCard from "./components/Card";
import { RootState } from "app/store/slice/index";
import { disableLoader, enableLoader } from "app/store/slice/loadingSlice";
import { enableSnackBar } from "app/store/slice/snackbarSlice";
import getMaterialHistory from "app/services/getMaterialHistory";
import moment from "moment";
const IssueMaterial: React.FC = () => {
  const dispatch = useDispatch();
  const [materialData, setMaterialData] = useState({
    issueItems: [],
    replaceItems: [],
  });
  const route = useRoute();
  const params = route?.params;
  const styles = useStyle();
  const isLoginLoading = useSelector(
    (state: RootState) => state.loading.loading
  );
  const width = getPercentageWidth();
  const height = getPercentageHeight();

  const theme = useTheme();
  useLayoutEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    try {
      dispatch(enableLoader());
      const response = await getMaterialHistory(`/${params.serviceOrderNo}`);

      if (
        response.status == 200 &&
        Array.isArray(response.data) &&
        response.data.length != 0
      ) {
        setMaterialData(response.data[0]);
      }
    } catch (error) {
      dispatch(enableSnackBar(""));
    } finally {
      dispatch(disableLoader());
    }
  }, [params]);

  const renderItem = ({ item, index }) => {
    return (
      <MaterialCard
        itemNumber={item?.itemnmbr}
        bachNumb={item?.bachnumb}
        qty={item.qty}
        date={item.issueDate}
        type="issue"
      />
    );
  };
  const ListEmpty = () => {
    return (
      <View style={styles.listComponent}>
        {!isLoginLoading && (
          <Text style={styles.emptyText}>No Card Available</Text>
        )}
      </View>
    );
  };
  const renderCard = ({ item, index }) => {
    return (
      <MaterialCard
        itemNumber={item?.itemnmbr}
        bachNumb={item?.bachnumb}
        qty={item.qty}
        date={item.replaceDate}
        type={"replace"}
      />
    );
  };
  return (
    <View style={styles.row}>
      <View style={styles.tabView}>
        <FlatList
          nestedScrollEnabled={true}
          data={materialData.issueItems}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: height(5),
          }}
          onRefresh={getData}
          refreshing={isLoginLoading}
          renderItem={renderItem}
          ListEmptyComponent={ListEmpty}
          keyExtractor={(item, index) => `_key${index.toString()}`}
        />
      </View>
      <View style={styles.tabView}>
        <FlatList
          refreshing={isLoginLoading}
          onRefresh={getData}
          nestedScrollEnabled={true}
          data={materialData.replaceItems}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCard}
          ListEmptyComponent={ListEmpty}
          keyExtractor={(item, index) => `_key${index.toString()}`}
        />
      </View>
    </View>
  );
};

export default IssueMaterial;
