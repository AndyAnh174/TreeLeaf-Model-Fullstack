import { PredictResponse } from "@/types/api";
import { apiRequest, ApiError } from "./client";

export async function predictDisease(file: File): Promise<PredictResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/predict`,
      {
        method: "POST",
        body: formData,
      }
    );

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
    throw new Error(`Failed to predict disease: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

export async function getHealthStatus() {
  return apiRequest("/health");
}

export async function getClassNames() {
  return apiRequest("/class-names");
}

