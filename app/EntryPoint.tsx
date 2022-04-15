/**
 * React Native App
 * Everything starts from the Entry-point
 */

import Navigator from "./navigation";
import { persistor, store } from "./store";
import { RootState } from "./store/slice";
import React, { useEffect } from "react";
import { ActivityIndicator, LogBox } from "react-native";
import codePush from "react-native-code-push";
import { Provider as PaperProvider } from "react-native-paper";
import { MenuProvider } from "react-native-popup-menu";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import DarkTheme from "./theme/DarkTheme";
import DefaultTheme from "./theme/DefaultTheme";
import Splash from 'react-native-splash-screen';
import analytics from '@segment/analytics-react-native';

import {
  createClient,
  AnalyticsProvider,
} from '@segment/analytics-react-native';
const RootNavigation: React.FC = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? DarkTheme : DefaultTheme;
  return (
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  );
};
const codePushOptions = {
  updateDialog: false,
  installMode: codePush.InstallMode.IMMEDIATE,
};

async function analyticsSetup(): Promise<void> {
  await analytics.setup("b0yEdiSUWmcEg2xuxnBjVUZiw3b0twbC", {
    recordScreenViews: false,
    trackAppLifecycleEvents: true,
  });
}

// c5aef0f556d4b5d50c168f7a6ab65d1d889eba54
    
// create the client once when he app loads
// const segmentClient = createClient({
//   writeKey: 'b0yEdiSUWmcEg2xuxnBjVUZiw3b0twbC'
// });
const EntryPoint: React.FC = () => {
  useEffect(() => {
    Splash.hide()
    analyticsSetup();

  }, []);
  return (
    <>
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <MenuProvider>
          <RootNavigation />
        </MenuProvider>
      </PersistGate>
    </Provider>
    </>

  );
};
export default codePush(codePushOptions)(EntryPoint);
