/* App config for apis
 */
const ApiConfig = {
  // BASE_URL: 'https://jsonplaceholder.typicode.com/',
  // LOGIN: 'api/login',
  // USERDATA:'todos/1'

  BASE_URL:
    "http://cmworkformdev.connexusenergy.int:8000/gpapi/api/v1/InventoryTransfer/",
  LOGIN_TRUCK: "truckMap",
  CREW_LOOKUP: "crewList",
  CREW_LOOKUP_BY_ID: "serviceorders",
  TOP_ITEM_LIST: "topItemList",
  ALL_ITEMS_LIST: "itemList",
  PICK_ITEMS_LIST: "picklist",
  EQUIPMENT_ITEMS_LIST: "equipmentlist",
  ENVIRONMENT: "DEV",
  baseUrl: "",
  EQUIPMENT_TRANSFER: "equipmentTransfer",
  ISSUE_MATERIAL: "projectInventoryTransfer",
  CREW_NOTES: "crewNotes",
  GET_MATERIAL_HISTORY: "history",
  GET_UN_POSTED_MATERIAL: "unpostedMaterial",
  SET_CREW_ID: "setDefaultCrewID",
};
let baseUrl = ApiConfig.BASE_URL;
if (ApiConfig.ENVIRONMENT == "DEV") {
  baseUrl = ApiConfig.BASE_URL;
} else if (ApiConfig.ENVIRONMENT == "PROD") {
  baseUrl = ApiConfig.PROD_ENVIRONMENT_BASE_URL;
} else if (ApiConfig.ENVIRONMENT == "TEST") {
  baseUrl = ApiConfig.TEST_ENVIRONMENT_BASE_URL;
} else {
  baseUrl = ApiConfig.DEV_ENVIRONMENT_BASE_URL;
}
ApiConfig.baseUrl = baseUrl;
export default ApiConfig;
