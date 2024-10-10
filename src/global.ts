const BACKEND_URL = "192.168.1.12:3030";
const global = {
  API_URL: "http://" + BACKEND_URL,
  WS_URL: "ws://" + BACKEND_URL + "/ws",
};

Object.freeze(global);
export default global;
