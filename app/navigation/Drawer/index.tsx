import React from "react";
import { View, Text } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import ThemeController from "../../components/ThemeController";
import { useDispatch, useSelector } from "react-redux";
import * as loginActions from "./../../store/slice/userSlice";
import ApiConfig from "./../../config/api-config";
import { useStyle } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  appleAuth,
  AppleAuthRequestOperation,
} from "@invertase/react-native-apple-authentication";
import { useTheme } from "react-native-paper";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { RootState } from "app/store/slice/index";
const Drawer: React.FC = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.user.isLoggedIn);

  const onAppleButtonPress = async () => {
    try {
      await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGOUT,
      });
    } catch (error) {}
  };
  const onLogout = async () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    await AsyncStorage.setItem("API_URL", ApiConfig.baseUrl);
    onAppleButtonPress();
    dispatch(loginActions.logOut());
  };

  const theme = useTheme();
  const styles = useStyle();
  const navigation = useNavigation();
  const navigateToSetting = () => {
    navigation.navigate("Settings");
  };
  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.preference}>
          <Text style={styles.text}>Theme </Text>
          <ThemeController />
        </View>

        <DrawerItem
          icon={({ size }) => (
            <Ionicons
              name="settings-outline"
              color={theme.colors.primary}
              size={40}
            />
          )}
          onPress={navigateToSetting}
          label={"Setting"}
          activeTintColor="#2196f3"
          activeBackgroundColor="rgba(0, 0, 0, .04)"
          inactiveTintColor="rgba(0, 0, 0, .87)"
          inactiveBackgroundColor="transparent"
          labelStyle={styles.text}
        />
        <DrawerItem
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="logout"
              color={theme.colors.primary}
              size={40}
            />
          )}
          onPress={onLogout}
          label={"Logout"}
          activeTintColor="#2196f3"
          activeBackgroundColor="rgba(0, 0, 0, .04)"
          inactiveTintColor="rgba(0, 0, 0, .87)"
          inactiveBackgroundColor="transparent"
          labelStyle={styles.text}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default Drawer;
