import LoginBody from "../types/LoginBody";
import ResponseBody from "../types/ResponseBody";

const API_URL = "http://localhost:3030";

async function login(body: LoginBody): Promise<ResponseBody<void>> {
  return await callApi("/login", "post", body);
}

async function register(body: LoginBody): Promise<ResponseBody<void>> {
  return await callApi("/register", "post", body);
}

async function callApi<RequestBody, ResponseData>(
  path: string,
  method: "get" | "post" | "patch" | "delete",
  body?: RequestBody,
): Promise<ResponseBody<ResponseData>> {
  return await fetch(API_URL + path, {
    method: method,
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.warn(error);
      return { message: "Server error" };
    });
}

export default {
  login,
  register,
};
