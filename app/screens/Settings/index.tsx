import React, { useEffect, useState } from "react";
import { View, Text, LogBox } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "react-native-paper";
import { getPercentageWidth } from "./../../utils/dimensionUtil";
import { RootState } from "./../../store/slice";
import TaskDetailHeader from "../../headers/TaskDetailHeader";
import WorkOrderComponent from "../../components/Test/WorkOrder/WorkOrderComponent";
import * as crewLookupAction from "app/store/actions/crewLookupActions";
import * as crewLookupByIdActions from "app/store/actions/crewLookupByIdActions";
import { useStyle } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Select, {
  SelectConfig,
  SelectItem,
} from "@redmin_delishaj/react-native-select";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart"; // Import package from node modules
import * as appActions from "app/store/slice/appSlice";
import * as userAction from "app/store/slice/userSlice";
import axios from "axios";
import { useIsFocused } from "@react-navigation/core";

// const data: SelectItem[] = [
//     { text: 'Option 1', value: 1 },
//     { text: 'Option 2', value: 2 },
//     { text: 'Option 3', value: 3 },
// ];
const Settings: React.FC = () => {
  //  analytics.setup('YOUR_WRITE_KEY', {
  //     // Record screen views automatically!
  //     recordScreenViews: true,
  //     // Record certain application events automatically!
  //     trackAppLifecycleEvents: true
  //   })

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {
      label: "Development",
      value:
        "http://cmworkformdev.connexusenergy.int:8000/gpapi/api/v1/InventoryTransfer/",
    },
    {
      label: "Test",
      value:
        "http://cmworkformtest.connexusenergy.int:8000/gpapi/api/v1/InventoryTransfer/",
    },
    {
      label: "Production",
      value:
        "http://cmworkform.connexusenergy.int:8000/gpapi/api/v1/InventoryTransfer/",
    },
  ]);
  const styles = useStyle();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useTheme();
  const width = getPercentageWidth();
  const data = useSelector((state: RootState) => state?.user?.user);
  const baseUrl = useSelector((state) => state?.app?.baseURL);
  const [value, setValue] = useState(baseUrl);

  const config: SelectConfig = {
    fontSize: 18,
    backgroundColor: "pink",
    textColor: theme.colors.background,
    selectedBackgroundColor: "red",
    selectedTextColor: "red",
    selectedFontWeight: "bold",
  };
  const onChange = async (item: any) => {
    dispatch(appActions.onSelectBaseURL(item.value));
  };

  const isFous = useIsFocused();

  const geturl = async () => {
    let value = await AsyncStorage.getItem("API_URL");
    setValue(value);
  };
  useEffect(() => {
    if (isFous) {
      geturl();
    }
  }, []);
  return (
    <>
      <TaskDetailHeader
        title="Settings"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Set Your Environment Base URL here</Text>
        <DropDownPicker
          placeholder={"baseURL"}
          containerStyle={{
            width: "85%",
            height: "40%",
          }}
          textStyle={styles.inventoryText}
          labelStyle={styles.inventoryText}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          // setValue={onChange}
          setItems={setItems}
          onSelectItem={async (item: any) => {
            if (
              item.value !== "https://field-service-fake-api.herokuapp.com/"
            ) {
              setValue(item.value);
              dispatch(appActions.resetData());
              await AsyncStorage.setItem("API_URL", item.value);
              dispatch(appActions.onSelectBaseURL(item.value));
              navigation.navigate("Home");
            } else {
              setValue(item.value);
              await AsyncStorage.setItem("API_URL", item.value);

              dispatch(appActions.onSelectBaseURL(item.value));
              navigation.navigate("Home");
            }
            // RNRestart.Restart();
          }}
        />
      </View>
    </>
  );
};

export default Settings;
