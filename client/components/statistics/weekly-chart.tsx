"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface WeeklyChartProps {
  data: { labels: string[]; data: number[] };
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    "Lượt phân tích": data.data[index],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân tích theo tuần</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Lượt phân tích" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

