import { apiClient } from "./client";
import ApiConfig from "../config/api-config";

export default function AddEquipment(data: any) {
  return apiClient.post(ApiConfig.ISSUE_MATERIAL, data);
}
