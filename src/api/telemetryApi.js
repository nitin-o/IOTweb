import api from "./base";

export const getLatestTelemetry = () => api.get("/telemetry/latest");

export const getTelemetryByDevice = (deviceId) =>
  api.get(`/telemetry/device/${deviceId}`);