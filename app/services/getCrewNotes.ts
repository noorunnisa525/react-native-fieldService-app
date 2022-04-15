import { apiClient } from "./client";
import ApiConfig from "../config/api-config";

export default function getCrewNotes(data: string) {
  return apiClient.get(ApiConfig.CREW_NOTES + data);
}
