import { apiClient } from "./client";

export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string | null;
  role?: "owner" | "moderator" | "member" | "bot";
}

export interface LoginResponse {
  token: string;
  user: User;
}

export async function login(username: string): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>("/api/auth/login", { username });
}

export async function signup(username: string): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>("/api/auth/signup", { username });
}

export async function getCurrentUser(): Promise<{ user: User }> {
  return apiClient.get<{ user: User }>("/api/auth/me");
}
