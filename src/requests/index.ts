import global from "../global";
import FileInfo from "../types/FileInfo";
import Message from "../types/Message";
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

async function filesPfpPost(file: File): Promise<ResponseBody<string>> {
  const formData = new FormData();
  formData.append("file", file);

  const result = await fetch(global.API_URL + "/files/pfp", {
    method: "post",
    credentials: "include",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.warn(error);
      return { message: "Server error" };
    });

  return result;
}

async function filesMessagePost(
  messageId: number,
  files: File[],
): Promise<ResponseBody<FileInfo[]>> {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const result = await fetch(`${global.API_URL}/files/message/${messageId}`, {
    method: "post",
    credentials: "include",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.warn(error);
      return { message: "Unknown error" };
    });

  return result;
}

async function getRooms(
  abortSignal?: AbortSignal,
): Promise<ResponseBody<RoomPreview[]>> {
  return await callApi("/rooms", "get", undefined, abortSignal);
}

async function getRoomById(id: number): Promise<ResponseBody<RoomPreview>> {
  return await callApi("/rooms/" + id, "get");
}

async function roomsDirectPost(body: {
  username: string;
}): Promise<ResponseBody<Room>> {
  return await callApi("/rooms/direct", "post", body);
}

async function getMessages(
  roomId: number,
  abortSignal?: AbortSignal,
): Promise<ResponseBody<Message[]>> {
  return await callApi(
    `/rooms/${roomId}/messages`,
    "get",
    undefined,
    abortSignal,
  );
}

async function callApi<RequestBody, ResponseData>(
  path: string,
  method: "get" | "post",
  body?: RequestBody,
  abortSignal?: AbortSignal,
): Promise<ResponseBody<ResponseData>> {
  return await fetch(global.API_URL + path, {
    method: method,
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
    signal: abortSignal,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      if (error.message === "The operation was aborted. ") {
        return { message: "Aborted" };
      }

      console.warn(error);
      return { message: "Server error" };
    });
}

export default {
  login,
  register,
  userGet,
  filesPfpPost,
  filesMessagePost,
  getRooms,
  getRoomById,
  roomsDirectPost,
  getMessages,
};
