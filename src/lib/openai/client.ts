import axios, { AxiosError } from "axios";
import { mapOpenAIError } from "./errors";

export const openAIClient = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY ?? ""}`,
    },
    timeout: 30000,
});

// Response interceptor - handle errors
openAIClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const { status } = error.response || {};

        if (status) console.error(`[OpenAI Error ${status}]`, mapOpenAIError(status));
        else if (error.request) console.error("[OpenAI Error] Network error: No response received");

        return Promise.reject(error);
    }
);