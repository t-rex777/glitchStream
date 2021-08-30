import Axios from "axios";
import { API } from "./API";
export const GlitchApi = Axios.create({
  baseURL: API,
});

export const setGlitchHeader = (token) =>
  (GlitchApi.defaults.headers.common["authorization"] = `Bearer ${token}`);
