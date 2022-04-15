import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./../screens/Login";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../store/slice/";
import { navigationRef } from "./NavigationService";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Snackbar } from "react-native-paper";
import { getPercentageWidth } from "./../utils/dimensionUtil";
import Drawer from "./Drawer";
import Home from "./../screens/Home";
import TaskDetail from "../screens/TaskDetail";
import WorkOrder from "./../screens/WorkOrder";
import IssueMaterial from "./../screens/IssueMaterial";
import AddMaterial from "./../screens/AddMaterial";
import TransferEquipment from "app/screens/TransferEquipment";
import LoadingView from "app/components/LoadingView";
import { disableSnackBar } from "app/store/slice/snackbarSlice";
import Settings from "../screens/Settings/index";

const HomeStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppDrawer = createDrawerNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={"Login"} component={Login} />
      <AuthStack.Screen name={"Settings"} component={Settings} />
    </AuthStack.Navigator>
  );
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name={"Home"} component={Home} />
      <HomeStack.Screen name={"WorkOrder"} component={WorkOrder} />

      <HomeStack.Screen name={"TaskDetail"} component={TaskDetail} />

      <HomeStack.Screen name={"IssueMaterial"} component={IssueMaterial} />
      <HomeStack.Screen
        name={"TransferEquipmemt"}
        component={TransferEquipment}
      />

      <HomeStack.Screen name={"AddMaterial"} component={AddMaterial} />
      <HomeStack.Screen name={"Settings"} component={Settings} />
    </HomeStack.Navigator>
  );
};
const LoggedInNavigator = () => {
  const width = getPercentageWidth();

  return (
    <AppDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: width("50%") },
      }}
      drawerContent={() => <Drawer />}
    >
      <AppDrawer.Screen name={"Main"} component={HomeStackNavigator} />
    </AppDrawer.Navigator>
  );
};
const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state?.user?.isLoggedIn);
  const loading = useSelector((state: RootState) => state.loading.loading);

  const isVisibleSnackBar = useSelector(
    (state: RootState) => state.snackbar.isVisible
  );
  const message = useSelector((state: RootState) => state.snackbar.message);

  const dispatch = useDispatch();
  const onDismissSnackBar = () => {
    dispatch(disableSnackBar());
  };
  useEffect(() => {
    if (isVisibleSnackBar) {
      setTimeout(() => {
        dispatch(disableSnackBar());
      }, 7000);
    }
  }, [isVisibleSnackBar]);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar />

      {isLoggedIn ? <LoggedInNavigator /> : <AuthNavigator />}
      {loading && <LoadingView />}
      <Snackbar visible={isVisibleSnackBar} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
    </NavigationContainer>
  );
};

export default App;
