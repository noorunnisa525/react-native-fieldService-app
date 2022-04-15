import { apiClient } from "./client";
import ApiConfig from "../config/api-config";

export default function getCrewLookup() {
  return apiClient.get(ApiConfig.CREW_LOOKUP);
}
