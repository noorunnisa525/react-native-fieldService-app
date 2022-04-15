import { apiClient } from "./client";
import ApiConfig from "../config/api-config";

export default function equipmentList() {
  return apiClient.get(ApiConfig.EQUIPMENT_ITEMS_LIST);
}
