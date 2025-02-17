import axiosInstance from "../utils/axios-config.ts";
import axios from "axios";
import {User} from "../types/interfaces.ts"

type AuthResponse = {
  message: string;
  user?: User;
}

type FetchOptions<T = unknown> = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: T;
  headers?: Record<string, string>;
};

class ApiClient {
  async register(email: string, username: string, name: string, password: string) {
    return this.fetch<AuthResponse>("/api/user/register", {
      method: "POST",
      body: JSON.stringify({email, username, name, password}),
    });
  }

  async login(identifier: string, password: string) {
    return this.fetch<AuthResponse>("/api/user/login", {
      method: "POST",
      body: JSON.stringify({identifier, password}),
    })
  }

  async logout() {
    return this.fetch<AuthResponse>("/api/user/logout", {
      method: "POST",
    })
  }

  async get_user() {
    return this.fetch<AuthResponse>("/api/user/", {
      method: "GET",
    })
  }

  private async fetch<T, B = unknown>(
      endpoint: string,
      options: FetchOptions<B> = {method: "GET"}
  ): Promise<T> {
    const {method, body, headers = {}} = options;

    try {
      const response = await axiosInstance.request<T>({
        url: endpoint,
        method,
        data: body,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "API request failed");
      }
      throw new Error("An unknown error occurred");
    }
  }
}

export const apiClient = new ApiClient();