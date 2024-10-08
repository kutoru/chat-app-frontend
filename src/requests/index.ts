import global from "../global";
import ResponseBody from "../types/ResponseBody";
import Room from "../types/Room";
import RoomPreview from "../types/RoomPreview";
import User from "../types/User";

async function login(body: {
  username: string;
  password: string;
}): Promise<ResponseBody<void>> {
  return await callApi("/login", "post", body);
}

async function register(body: {
  username: string;
  password: string;
}): Promise<ResponseBody<void>> {
  return await callApi("/register", "post", body);
}

async function userGet(): Promise<ResponseBody<User>> {
  return await callApi("/users", "get");
}

async function filesPfpPost(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const result: ResponseBody<string> = await fetch(
    global.API_URL + "/files/pfp",
    {
      method: "post",
      credentials: "include",
      body: formData,
    },
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.warn(error);
      return { message: "Server error" };
    });

  return result;
}

async function roomsDirectPost(body: {
  username: string;
}): Promise<ResponseBody<Room>> {
  return await callApi("/rooms/direct", "post", body);
}

async function getRooms(): Promise<ResponseBody<RoomPreview[]>> {
  return await callApi("/rooms", "get");
}

async function callApi<RequestBody, ResponseData>(
  path: string,
  method: "get" | "post" | "patch" | "delete",
  body?: RequestBody,
): Promise<ResponseBody<ResponseData>> {
  return await fetch(global.API_URL + path, {
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
  userGet,
  filesPfpPost,
  roomsDirectPost,
};
