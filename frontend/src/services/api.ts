import axios from "axios";
import { getEnvVar } from "../config/env";
import { getCookie } from "../config/cookies";

export const API_BASE_URL = getEnvVar("REACT_APP_URL_API");


export const api = axios.create({
    baseURL: API_BASE_URL,
});

const token = getCookie("@token");
api.defaults.headers.common.Authorization = `Bearer ${token}`;