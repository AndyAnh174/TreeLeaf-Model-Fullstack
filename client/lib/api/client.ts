import type { ApiError as ApiErrorType } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8005/api/v1";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: ApiErrorType
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.detail || `HTTP ${response.status}`,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error(`Network error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

