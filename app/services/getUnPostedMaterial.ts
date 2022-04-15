import { apiClient } from "./client";
import ApiConfig from "../config/api-config";

export default function getUnPostedMaterial(data: any) {
  return apiClient.get(ApiConfig.GET_UN_POSTED_MATERIAL + data);
}
