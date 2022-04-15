import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { RootState } from "app/store/slice/index";
import { ActivityIndicator, useTheme } from "react-native-paper";
interface ILoadProps {
  shouldLoading?: boolean;
}

// Purpose: Handle Loading component
export default function Loader({ shouldLoading = false }: ILoadProps) {
  const isLoginLoading = useSelector(
    (state: RootState) => state.loading.loading
  );
  const theme = useTheme();
  return (
    <Modal
      animationInTiming={1000}
      animationOutTiming={1000}
      isVisible={shouldLoading || isLoginLoading}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={theme.colors.borderShow} size={"large"} />
      </View>
    </Modal>
  );
}
