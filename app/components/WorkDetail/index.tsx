import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useStyle } from "./styles";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "../../utils/dimensionUtil";
import { TouchableOpacity } from "react-native-gesture-handler";
import getCrewNotes from "app/services/getCrewNotes";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "app/store/slice/loadingSlice";
import { enableSnackBar } from "app/store/slice/snackbarSlice";
import { useIsFocused } from "@react-navigation/core";
interface Props {
  workOrder: string;
  description: string;
  projectClass: string;
  customerName: string;
  locationDescription: string;
  equipmentId?: string;
  crewNotes?: string;
  block?: string;
  serviceOrderStatus?: string;
  managerContatctInfo?: string;
  lot?: string;
}
const WorkDetail: React.FC<Props> = (props) => {
  const styles = useStyle();
  const [crewNotes, setCrewNotes] = useState([]);
  const [viewNotes, setViewNotes] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setViewNotes(false);
      setCrewNotes([]);
    }
  }, [props.workOrder]);
  const getCrewNote = async (value: boolean) => {
    setViewNotes(!viewNotes);
    if (value) {
      try {
        dispatch(enableLoader());
        let data: AxiosResponse<any> = await getCrewNotes(
          "/" + props.workOrder
        );

        if (data.status == 200) {
          setCrewNotes(data.data);
        } else {
          dispatch(enableSnackBar(""));
        }
      } catch (error) {
        dispatch(enableSnackBar(""));
      } finally {
        dispatch(disableLoader());
      }
    }
  };
  const onPresViewAll = () => {
    getCrewNote(!viewNotes);
  };
  return (
    <>
      <View style={styles.container}>
        {/* //half view first*/}
        <View style={styles.subContainer}>
          <Text style={styles.title}>
            {`Work Order: \n`}
            <Text style={styles.text}>{props.workOrder}</Text>
          </Text>
          <View style={styles.subContainer}>
            <Text style={styles.title}>
              {`Project Class: \n`}
              <Text style={styles.text}>{props.projectClass}</Text>
            </Text>
          </View>

          <View style={styles.subContainer}>
            <Text style={styles.title}>
              {`Customer Name: \n`}
              <Text style={styles.text}>{props.customerName}</Text>
            </Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.title}>
              {`LOT: \n`}
              <Text style={styles.text}>{props.lot}</Text>
            </Text>
          </View>
          <View style={styles.subContainer}>
            {/* {props.equipmentId ? ( */}
            <Text style={styles.title}>
              {`Equipment Id: \n `}
              <Text style={styles.text}>{props?.equipmentId}</Text>
            </Text>
            {/* ) : null} */}
          </View>
        </View>
        {/* //half view Second*/}
        <View style={styles.subContainer}>
          <Text style={styles.title}>
            {`Description: \n `}
            <Text style={styles.text}>{props.description}</Text>
          </Text>
          <View style={styles.subContainer}>
            <Text style={styles.title}>
              {`Service Order Status: \n`}
              <Text style={styles.text}>{props.serviceOrderStatus}</Text>
            </Text>
          </View>

          <View style={styles.subContainer}>
            <Text style={styles.title}>
              {`Location Desc: \n`}
              <Text style={styles.text}>{props.locationDescription}</Text>
            </Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.title}>
              {`Block: \n`}
              <Text style={styles.text}>{props.block}</Text>
            </Text>
          </View>
          <View style={styles.subContainer}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
              {` \n`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.notesContainer}>
        <Text
          // ellipsizeMode='tail'
          style={styles.notes}
        >
          {`Crew Notes:`}
        </Text>
        <TouchableOpacity onPress={onPresViewAll}>
          <Text
            // ellipsizeMode='tail'
            style={styles.notes}
          >
            {props.crewNotes?.trim() != "" && viewNotes
              ? "View Less"
              : props.crewNotes?.trim() != "" && "View All"}
          </Text>
        </TouchableOpacity>
      </View>
      {viewNotes ? (
        crewNotes?.map((data) => (
          <Text style={[styles.text, styles.detailNotes]}>{data.notes}</Text>
        ))
      ) : (
        <Text style={[styles.text, styles.detailNotes]}>{props.crewNotes}</Text>
      )}
    </>
  );
};
export default WorkDetail;
