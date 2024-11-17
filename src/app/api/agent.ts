import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../models/generics/paginatedResponse";
import { router } from "../router/Routes";
import { store } from "../store/configureStore";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
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
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
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
  getCurrentUser: () => requests.get("account/current-user"),
  getAddress: () => requests.get("account/saved-address"),
};

const Order = {
  getAll: () => requests.get("order"),
  getOne: (id: number) => requests.get(`order/${id}`),
  create: (values: object) => requests.post("order", values),
};

const Payment = {
  create: () => requests.post("payment", {}),
};

interface ProductFormData {
  [key: string]: string | Blob;
}

function createFormData(item: ProductFormData) {
  const formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

const Admin = {
  createProduct: (product: ProductFormData) =>
    requests.postForm("products", createFormData(product)),
  updateProduct: (product: ProductFormData) =>
    requests.putForm("products", createFormData(product)),
  deleteProduct: (id: number) => requests.del(`products/${id}`),
};

const agent = {
  Product,
  Basket,
  Account,
  Order,
  Payment,
  Admin,
};

export default agent;
