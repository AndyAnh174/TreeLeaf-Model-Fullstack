"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MetricsCards } from "@/components/statistics/metrics-cards";
import { WeeklyChart } from "@/components/statistics/weekly-chart";
import { DiseaseChart } from "@/components/statistics/disease-chart";
import { getStatistics } from "@/lib/api/statistics";
import { toast } from "sonner";
import type { StatisticsResponse } from "@/types/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StatisticsPage() {
  const [data, setData] = useState<StatisticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getStatistics();
      setData(result);
    } catch (err) {
      console.error("Statistics error:", err);
      setError(err instanceof Error ? err.message : "Không thể tải dữ liệu");
      toast.error("Không thể tải thống kê. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thống kê</h1>
          <p className="text-muted-foreground">
            Xem biểu đồ và metrics về hệ thống
          </p>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || "Không thể tải dữ liệu thống kê"}
          </AlertDescription>
        </Alert>
        <Button onClick={fetchData}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thống kê</h1>
          <p className="text-muted-foreground">
            Xem biểu đồ và metrics về hệ thống
          </p>
        </div>
        <Button onClick={fetchData} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Làm mới
        </Button>
      </div>

      <MetricsCards metrics={data.metrics} />

      <div className="grid gap-6 md:grid-cols-2">
        <WeeklyChart data={data.weekly_analysis} />
        <DiseaseChart data={data.disease_distribution} />
      </div>
    </div>
  );
}

