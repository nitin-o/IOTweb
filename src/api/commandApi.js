import api from "./base";

export const sendCommand = (deviceId, payload) =>
  api.post(`/commands/${deviceId}`, payload);