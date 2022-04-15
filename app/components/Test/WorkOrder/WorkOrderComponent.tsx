import React, { useEffect, useState } from "react";
import { Text, View, useWindowDimensions, FlatList } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "app/utils/dimensionUtil";
import { useStyle } from "./styles";
import WorkOrderRow from "./WorkOrderRow";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/core";

interface Props {
  status: "INPRG" | "RDYASSIGN" | "Completed";
  title?: string;
  row?: {};
  onPress?: () => void;
  newData?: [];
  selectCrewId?: string;
}

const WorkOrderComponent: React.FC<Props> = (props) => {
  const styles = useStyle();
  const width = getPercentageWidth();
  const navigation = useNavigation();
  const theme = useTheme();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (Array.isArray(props.newData) && isFocused) {
      const filterData: [] = props.newData?.filter((item: any) => {
        return item.cnxStatus == props.status;
      });

      setData(filterData);
    }
  }, [props.newData]);

  const ListEmptyComponent = () => {
    return (
      <View style={styles.listComponent}>
        {
          <Text style={styles.emptyHeaderText}>
            {`You do not have any ${props.status.toLowerCase()} work orders`}
          </Text>
        }
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const onPressCard = () => {
      navigation.navigate("TaskDetail", {
        item: item,
      } as never);
    };
    return (
      <WorkOrderRow
        onPress={onPressCard}
        status={item?.cnxStatus}
        workOrder={item?.serviceOrderNo}
        client={item?.serviceOrderDesc}
        location={item?.locAssetPositionDesc}
        equipmentId={item?.equipmentId}
        serviceOrderNo={item?.projectClass}
        custName={item?.billToCustName}
      />
    );
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <Icon name="circle" color={theme.colors.accent} size={width("2%")} />
        <Text style={styles.workOrderComponentHeading}>{props.title}</Text>
      </View>
      <FlatList
        nestedScrollEnabled={true}
        data={data}
        style={{ borderColor: theme.colors.backdrop }}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        listKey={`_key${props.status}`}
        keyExtractor={(item, index) => `_key${index.toString()}`}
      />
    </>
  );
};
export default WorkOrderComponent;
