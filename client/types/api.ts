// API Response Types

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
  chatbot_loaded: boolean;
  device: string | null;
}

export interface PredictResponse {
  success: boolean;
  disease: string;
  confidence: number;
  confidence_percent: string;
}

export interface ChatResponse {
  success: boolean;
  response: string;
}

export interface ClassNamesResponse {
  success: boolean;
  classes: string[];
  total: number;
}

export interface StatisticsResponse {
  success: boolean;
  metrics: {
    total_analysis: number;
    total_analysis_today: number;
    accuracy: number;
    accuracy_delta: number;
    chatbot_questions: number;
    chatbot_questions_today: number;
    total_users: number;
    new_users: number;
  };
  weekly_analysis: {
    labels: string[];
    data: number[];
  };
  disease_distribution: {
    labels: string[];
    data: number[];
  };
}

export interface ApiError {
  detail: string;
}

