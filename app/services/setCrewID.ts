import { apiClient } from "./client";
import ApiConfig from "../config/api-config";

export default function setDefaultCrew(data: any) {
  return apiClient.post(ApiConfig.SET_CREW_ID, data);
}
