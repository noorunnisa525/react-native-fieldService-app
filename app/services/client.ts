import axios from "axios";
import ApiConfig from "app/config/api-config";
import analytics from "@segment/analytics-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL = useSelector((state) => state?.app.baseURL);
const baseUrl_tested = ApiConfig.baseUrl;

const apiClient = axios.create({
  baseURL: ApiConfig.baseUrl,
  responseType: "json",
});

apiClient.interceptors.request.use(
  async function (config) {
    const baseURL: any = await AsyncStorage.getItem("API_URL");

    const url = config.url;

    config.baseURL = baseURL ? baseURL : config.baseURL;
    config.url = url;
    console.log(
      "apiConfig",
      `${config?.baseURL}${config.url}`,
      config?.params ? config?.params : config?.data
    );

    analytics.track(url, {
      url: config?.baseURL + config.url,
      params: config?.params,
      data: config?.data,
    });

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    analytics.track("response" + response.config.url, { ...response.data });

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    analytics.track("error", { url: error.config.baseURL + error.config.url });

    return Promise.reject(error);
  }
);
export { apiClient };
