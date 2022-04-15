import { apiClient } from "./client";
import ApiConfig from "../config/api-config";

export default function getHistoryMaterial(data: any) {
  return apiClient.get(ApiConfig.GET_MATERIAL_HISTORY + data);
}
