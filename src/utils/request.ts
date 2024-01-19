import axios from "axios";
import download from "downloadjs";

const errorMessage = console.error;
const statusCodes = [401, 403];
let url = "";
if (typeof chrome.storage !== "undefined")
  chrome.storage.local.get(["url"], (result) => {
    url = result.url;
  });

// 一般请求配置
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers.get["Cache-Control"] = "no-cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reponseFailCallback: (error: any) => any = (error) => {
  if (error.response === undefined || error.code === "ERR_NETWORK") {
    errorMessage("请检查您的网络环境");
    return Promise.reject({ code: 400, message: "请检查您的网络环境" });
  }
  if (!axios.isCancel(error)) {
    if (error.response && [500, 502].includes(error.response.status)) {
      errorMessage("服务器异常，请联系管理员");
    } else if (statusCodes.includes(error.response.status)) {
      errorMessage("登录凭据已过期，请重新登录");
    } else {
      console.log(error); // for debug
      if (error.response.data) {
        errorMessage(error.response.data.message);
      } else {
        errorMessage(error.message);
      }
    }

    return Promise.reject(error);
  }
  return Promise.reject(error);
};

axios.interceptors.request.use((config) => {
  config.url = url + config.url;
  return config;
});

axios.interceptors.response.use((response) => {
  const { data, headers, config } = response;
  if (config.responseType === "blob") {
    const res = download(
      data.data,
      headers["content-disposition"].split("=")[1],
    );
    if (typeof res === "boolean") {
      return res ? Promise.resolve(response) : Promise.reject(response);
    } else {
      return Promise.resolve(response);
    }
  }
  if (data.code === 20000) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
}, reponseFailCallback);

export const tts = (title: string, content: string) =>
  axios
    .post("/api/tts", {
      title,
      text: content,
      lang: "zh-cn",
    })
    .then((res) => {
      console.log(res);
      return res.data.data.id;
    });
export const queryProgress = (id: string) =>
  axios
    .get("/api/progress", {
      params: {
        id,
      },
    })
    .then((res) => {
      return res.data.data;
    });

export const downloadMp3 = (id: string) => {
  return axios.get("/api/download/" + id, {
    responseType: "blob",
  });
};
