import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconFont from "react-native-vector-icons/FontAwesome";
import IconAnt from "react-native-vector-icons/AntDesign";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import {
  getPercentageWidth,
  getPercentageHeight,
} from "./../utils/dimensionUtil";
import { useDispatch, useSelector } from "react-redux";
import analytics from "@segment/analytics-react-native";
import { RootState } from "../store/slice";

interface Props {
  title?: string;
  filterTitle?: string;
  onSelect?: () => void;
  item?: Array<string>;
  data?: Array<string>;
  selectCrewId?: string;
  setSelectedCrewId: (value: string) => void;
  onRefresh: () => void;
}

const MainHeader: React.FC<Props> = (props) => {
  const height = getPercentageHeight();
  const width = getPercentageWidth();
  const theme = useTheme();
  const navigation = useNavigation();

  const truckID = useSelector((state: RootState) => state.user.truckID);

  const optionsStyles = {
    optionsWrapper: {
      backgroundColor: theme.colors.background,
    },
    optionWrapper: {
      backgroundColor: theme.colors.background,
      margin: 1,
    },
  };

  const optionStyles = {
    optionTouchable: {
      underlayColor: theme.colors.underlayColor,
      activeOpacity: 40,
    },
    optionWrapper: {
      backgroundColor: theme.colors.underlayColor,
      margin: 1,
    },
    optionText: {
      color: theme.colors.text,
      fontSize: width(2.5),
    },
  };
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    let crewId = props?.selectCrewId ? props?.selectCrewId?.split("-") : null;
    crewId = crewId
      ? `${props?.selectCrewId?.substring(0, 5)}${parseInt(crewId[1])}`
      : "";
    let itemCrewId = item ? item?.crewId?.split("-") : null;
    itemCrewId = `${item?.crewId?.substring(0, 5)}${parseInt(itemCrewId[1])}`;

    return (
      <>
        <MenuOption
          customStyles={
            itemCrewId == crewId
              ? optionStyles
              : {
                  optionText: {
                    color: theme.colors.text,
                    fontSize: width(2.5),
                  },
                }
          }
          key={item.key}
          onSelect={() => {
            props?.setSelectedCrewId(item.crewId);
          }}
          text={item.crewId}
        />
      </>
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle={theme.colors.barStyle}
      />
      <SafeAreaView
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: theme.colors.primary,
          width: width("100%"),
          height: height("8%"),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
              // track('Toggle menu');
              analytics.track("Toggle_menu");
            }}
            style={{
              marginLeft: width("2%"),
            }}
          >
            <Icon
              name="menu"
              size={width("3%")}
              color={theme.colors.background}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: theme.colors.background,
              fontWeight: "bold",
              fontSize: width("3%"),
              marginLeft: width("2%"),
            }}
          >
            {"Welcome " + truckID}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: width("15%"),
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              marginLeft: width("2%"),
              flexDirection: "row",
            }}
          >
            <Menu>
              <MenuTrigger>
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: width("2%"),
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      color: theme.colors.icon,
                      fontSize: width("3%"),
                      flexDirection: "row",
                    }}
                  >
                    {props?.data?.length ? props.selectCrewId : ""}
                  </Text>
                  <IconFont
                    name="filter"
                    size={width("3%")}
                    color={theme.colors.background}
                    style={{
                      marginLeft: width("2%"),
                    }}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  paddingLeft: 8,
                  maxHeight: height("40"),
                  minHeight: height("8"),
                  width: "20%",
                  padding: height("1.1"),
                }}
                customStyles={{
                  ...optionsStyles,
                  optionText: {
                    fontSize: width("2.75%"),
                    color: theme.colors.text,
                  },
                }}
              >
                <FlatList
                  data={props.data}
                  renderItem={renderItem}
                  listKey={(item, index) => `_key${index.toString()}`}
                  keyExtractor={(item, index) => `_key${index.toString()}`}
                  ListEmptyComponent={() => {
                    return (
                      <View style={{ justifyContent: "center" }}>
                        {
                          <Text
                            style={{
                              color: theme.colors.text,
                              fontWeight: "bold",
                              fontSize: width("2%"),
                            }}
                          >
                            No data Found
                          </Text>
                        }
                      </View>
                    );
                  }}
                />
              </MenuOptions>
            </Menu>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props?.onRefresh();
            }}
          >
            <IconAnt
              name="reload1"
              size={width("3%")}
              color={theme.colors.background}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MainHeader;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   statusBar: {
//     height: STATUSBAR_HEIGHT,
//   },
//   appBar: {
//     backgroundColor: theme.colors.background,
//     height: APPBAR_HEIGHT,
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#33373B',
//   },
// });
