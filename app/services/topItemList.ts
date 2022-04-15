import { apiClient } from "./client";
import ApiConfig from "../config/api-config";

export default function topItemList() {
  return apiClient.get(ApiConfig.TOP_ITEM_LIST);
}
