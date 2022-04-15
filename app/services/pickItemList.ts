import { apiClient } from "./client";
import ApiConfig from "../config/api-config";

export default function pickItemList(data: any) {
  return apiClient.get(ApiConfig.PICK_ITEMS_LIST + data);
}
