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
import IssueMaterialComponent from "./IssueMaterial";
import MaterialHistory from "./History";
import UnPostedHistory from "./UnPosted";

const IssueMaterial: React.FC = () => {
  const styles = useStyle();
  const width = getPercentageWidth();
  const height = getPercentageHeight();
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();
  const data = route?.params;
  const isFocused = useIsFocused();
  const [isSubmit, setIsSubmit] = useState(false);
  const [currentTab, setCurrentTab] = useState<
    "issue" | "history" | "unPosted"
  >("issue");

  useEffect(() => {
    setIsSubmit(false);
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <IssueMaterialHeader
        title={`Issue material ${data?.projectNo}`}
        hideSubmit={currentTab != "issue"}
        onPress={() => {
          navigation.goBack();
        }}
        onSubmit={() => {
          setIsSubmit(true);
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: width(2),
          paddingTop: height(2),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCurrentTab("issue");
          }}
          style={{
            backgroundColor:
              currentTab == "issue"
                ? theme.colors.secondary
                : theme.colors.placeholder,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: width(3),
            paddingVertical: height(1),
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: width(3),
              fontWeight: "bold",
              color: theme.colors.background,
            }}
          >
            Issue Material
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentTab("unPosted");
          }}
          style={{
            backgroundColor:
              currentTab == "unPosted"
                ? theme.colors.secondary
                : theme.colors.placeholder,

            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: width(3),
            paddingVertical: height(1),
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: width(3),
              fontWeight: "bold",
              color:
                currentTab == "unPosted" ? theme.colors.background : "black",
            }}
          >
            Un Posted
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentTab("history");
          }}
          style={{
            backgroundColor:
              currentTab == "history"
                ? theme.colors.secondary
                : theme.colors.placeholder,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: width(3),
            paddingVertical: height(1),
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: width(3),
              fontWeight: "bold",
              color:
                currentTab == "history" ? theme.colors.background : "black",
            }}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {currentTab == "issue" ? (
        <IssueMaterialComponent onSubmit={setIsSubmit} isSubmit={isSubmit} />
      ) : currentTab == "unPosted" ? (
        <UnPostedHistory />
      ) : (
        <MaterialHistory />
      )}
    </View>
  );
};

export default IssueMaterial;
