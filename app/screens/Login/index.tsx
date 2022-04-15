import React, { useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import * as AppleAuthentication from "expo-apple-authentication";
import {
  Animated,
  Image,
  LogBox,
  Platform,
  useWindowDimensions,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { useStyle } from "./styles";
import images from "app/config/images";
import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import jwt_decode from "jwt-decode";
import { requestLoginTruck } from "app/store/actions/truckLoginAction";
import analytics from "@segment/analytics-react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "app/utils/dimensionUtil";
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyle();
  const navigation = useNavigation();
  const width = getPercentageWidth();
  const height = getPercentageHeight();

  const decodejtw = useCallback((token: string) => {
    analytics.track("token", { token });

    const decoded = jwt_decode(token);

    analytics.track("decodedtoken", { decoded });
    dispatch(requestLoginTruck(decoded.email ? decoded.email : ""));
  }, []);
  const onAppleButtonPress = useCallback(async () => {
    try {
      const authResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const { identityToken } = authResponse;
      if (identityToken) {
        decodejtw(identityToken);
      } else {
        alert("error");
      }
    } catch (error) {}
  }, []);
  const loin = () => {
    dispatch(requestLoginTruck("aleequre@connexusenergy.com"));
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={images.icons?.logo}
        resizeMode={"contain"}
        style={styles.logoStyles}
      />
      {Platform.OS === "ios" ? (
        <AppleButton
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_IN}
          style={styles.appleButton}
          onPress={onAppleButtonPress}
        />
      ) : null}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Text
          style={{
            fontSize: width(3),
            paddingTop: height(3),
          }}
        >
          Settings{" "}
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default Login;
