import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../models/generics/paginatedResponse";
import { router } from "../router/Routes";
import { store } from "../store/configureStore";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    const pagination = response.headers["pagination"];

    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );

      return response;
    }

    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];

          for (const key in data.errors)
            if (data.errors[key]) modelStateErrors.push(data.errors[key]);

          throw modelStateErrors.flat();
        }

        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 403:
        toast.error("No puedes realizar esta acción.");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Product = {
  getAll: (params: URLSearchParams) => requests.get("/product", params),
  getOne: (id: number) => requests.get(`/product/${id}`),
  getFilters: () => requests.get("/product/filters"),
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number, quantity: number) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity: number) =>
    requests.del(`basket?productId=${productId}&quantity=${quantity}`),
};

const Account = {
  login: (values: object) => requests.post("account/login", values),
  register: (values: object) => requests.post("account/register", values),
  currentUser: () => requests.get("account/current-user"),
  fetchAddress: () => requests.get("account/savedAddress"),
};

const agent = {
  Product: Product,
  Basket,
  Account,
};

export default agent;
