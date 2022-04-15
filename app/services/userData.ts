import { apiClient } from './client';
import ApiConfig from './../config/api-config';

export default function userData() {
    return apiClient.get(ApiConfig.USERDATA);
}
