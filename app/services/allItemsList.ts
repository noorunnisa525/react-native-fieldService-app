import { apiClient } from './client';
import ApiConfig from '../config/api-config';

export default function allItemsList() {
    return apiClient.get(ApiConfig.ALL_ITEMS_LIST);

}
