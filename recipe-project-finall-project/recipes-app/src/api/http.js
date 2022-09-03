import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8181/api";

export default {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data = {}) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data = {}) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data = {}) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint, method = "get", data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      headers: { autorisation: localStorage.getItem("tokenKey") || "" },
      data,
      params: method === "GET" ? data : null,
    });
    return res;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw err;
    } else {
      console.log(
        `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`
      );
      toast.error("שגיאת מערכת, נא לפנות למנהל המערכת.");
      throw err;
    }
  }
}
