import React, { useEffect, useCallback } from "react";
import { View, Text, LogBox, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "react-native-paper";
import { RootState } from "./../../store/slice";
import MainHeader from "../../headers/MainHeader";
import WorkOrderComponent from "../../components/Test/WorkOrder/WorkOrderComponent";
import * as crewLookupAction from "app/store/actions/crewLookupActions";
import * as crewLookupByIdActions from "app/store/actions/crewLookupByIdActions";
import { ScrollView } from "react-native-virtualized-view";
import { useStyle } from "./styles";
import { useIsFocused } from "@react-navigation/core";
import { onChangeCrewId } from "app/store/slice/userSlice";
import setDefaultCrewID from "app/services/setCrewID";
const Home: React.FC = () => {
  const styles = useStyle();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  LogBox.ignoreLogs([
    "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.", // TODO: Remove when fixed
  ]);

  const theme = useTheme();
  const crewLookup = useSelector((state: RootState) => state?.app?.crewLookup);
  const crewLookupByIdData = useSelector(
    (state: any) => state?.app.crewLookupById
  );
  const truckID = useSelector((state: RootState) => state.user.truckID);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.crewID && user.crewID != "") {
      dispatch(crewLookupByIdActions.requestCrewLookupById(user.crewID));
    }
  }, [user.crewID]);

  useEffect(() => {
    if (isFocused) {
      if (crewLookup?.length == 0) {
        dispatch(crewLookupAction.requestCrewLookup({}));
      }
    }
  }, [isFocused]);

  const onRefresh = () => {
    dispatch(crewLookupAction.requestCrewLookup({}));
    dispatch(crewLookupByIdActions.requestCrewLookupById(user.crewID));
  };
  const setSelectedCrewId = useCallback(
    async (value: string) => {
      dispatch(onChangeCrewId(value));
      try {
        const resposne = await setDefaultCrewID({
          iPadID: user.iPadID,
          truckID: user.truckID,
          crewID: value,
        });
        console.log(resposne.status);
      } catch (error) {
        console.log("error", error);
      }
    },
    [user]
  );
  return (
    <>
      <MainHeader
        title={"Welcome " + truckID}
        onRefresh={onRefresh}
        data={crewLookup}
        setSelectedCrewId={setSelectedCrewId}
        selectCrewId={user.crewID}
      />
      {crewLookup?.length ? (
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          style={{
            backgroundColor: theme.colors.background,
          }}
          contentContainerStyle={{
            paddingBottom: 80,
            backgroundColor: theme.colors.background,
          }}
        >
          <View style={styles.serviceButtonStyles}></View>
          <View style={styles.workOrderComponentStyle}>
            <Text style={styles.workOrderComponentTitle}>
              {user.crewID} {`Work Orders`}
            </Text>
            <WorkOrderComponent
              newData={crewLookupByIdData}
              selectCrewId={user.crewID}
              title="In Progress"
              status="INPRG"
            />
            <WorkOrderComponent
              newData={crewLookupByIdData}
              selectCrewId={user.crewID}
              title="Assigned work orders"
              status="RDYASSIGN"
            />

            <WorkOrderComponent
              newData={crewLookupByIdData}
              selectCrewId={user.crewID}
              title="History"
              status="Completed"
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.footer}>
          <Text style={styles.title}>No Truck with this AccountId found</Text>
        </View>
      )}
    </>
  );
};

export default Home;
