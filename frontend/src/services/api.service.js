import axios from "axios";

// Cấu hình chung cho yêu cầu API
const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// Hàm kiểm tra xem API localhost có sẵn không
async function checkLocalhost() {
  try {
    await axios.get("http://localhost:5000/api/v1/check");
    return true;
  } catch (error) {
    return false;
  }
}

// Hàm tạo axios instance với interceptor để làm mới token
const createApiClient = (path) => {
  const rootURL = "http://localhost:5000/api/v1";
  const baseURL = `${rootURL}${path}`;

  const api = axios.create({
    baseURL: baseURL,
    ...commonConfig,
  });

  // Intercept response để xử lý hết hạn token và làm mới token
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem("refreshToken");

      // Kiểm tra lỗi hết hạn token
      if (
        error.response &&
        error.response.data.error === "Token expired!" &&
        !originalRequest._retry &&
        refreshToken
      ) {
        originalRequest._retry = true;

        try {
          // Cố gắng làm mới token
          const response = await axios.post(`${rootURL}/auth/refresh`, {
            refreshToken: refreshToken,
          });

          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          // Lưu token mới vào localStorage
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Cập nhật header Authorization cho yêu cầu gốc
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Thử lại yêu cầu gốc
          return axios(originalRequest);
        } catch (refreshError) {
          // Nếu yêu cầu làm mới token thất bại, xoá token và chuyển hướng đến login
          if (
            refreshError.response &&
            refreshError.response.data.error === "Token expired!"
          ) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default createApiClient;
