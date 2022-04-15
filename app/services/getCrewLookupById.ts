import { apiClient } from "./client";
import ApiConfig from "../config/api-config";

export default function getCrewLookupById(data: string) {
  return apiClient.get(ApiConfig.CREW_LOOKUP_BY_ID + data);
}
