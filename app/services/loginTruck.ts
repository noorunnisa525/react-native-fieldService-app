import { apiClient } from "./client";
import ApiConfig from "../config/api-config";

export default function loginTruck(data: string) {
  return apiClient.get(ApiConfig.LOGIN_TRUCK + data);
}
