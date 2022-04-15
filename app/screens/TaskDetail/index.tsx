import React, { useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { useStyle } from "./styles";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import WorkDetail from "../../components/WorkDetail";
import ServiceButton from "../../components/ServiceButton";
import TaskDetailHeader from "../../headers/TaskDetailHeader";

const TaskDetail: React.FC = () => {
  const styles = useStyle();
  const navigation = useNavigation();
  const route = useRoute();
  const data = route?.params;
  const theme = useTheme();
  const onPressHeader = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.main}>
      <TaskDetailHeader title="Work order details" onPress={onPressHeader} />

      <ScrollView contentContainerStyle={styles.container}>
        <WorkDetail
          workOrder={data?.item?.serviceOrderNo}
          description={data?.item?.serviceOrderDesc}
          projectClass={data?.item?.projectClass}
          customerName={data?.item?.billToCustName}
          locationDescription={data?.item?.locAssetPositionDesc}
          equipmentId={data?.item?.equipmentId}
          crewNotes={data?.item?.crewNotes ? data?.item?.crewNotes : ""}
          serviceOrderStatus={data?.item?.cnxStatus}
          block={data?.item?.block}
          lot={data?.item?.lot}
          managerContatctInfo={data?.item?.projectManagerId}
        />

        {data?.item.cnxStatus != "Completed" && (
          <View style={styles.topServiceButtonView}>
            <ServiceButton
              image={require("../../assets/IssueMaterial.png")}
              title="Issue Material"
              iconName="miscellaneous-services"
              onPress={() => {
                navigation.navigate("IssueMaterial" as never, data?.item);
              }}
            />
            <ServiceButton
              image={require("../../assets/TransferEquipment.png")}
              title="Transfer Equipment"
              iconName="transfer-within-a-station"
              onPress={() => {
                navigation.navigate("TransferEquipmemt" as never, data);
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TaskDetail;
