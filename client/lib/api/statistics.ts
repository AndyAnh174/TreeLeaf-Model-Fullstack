import { StatisticsResponse } from "@/types/api";
import { apiRequest } from "./client";

export async function getStatistics(): Promise<StatisticsResponse> {
  return apiRequest<StatisticsResponse>("/statistics");
}

