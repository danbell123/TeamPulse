'use client';

import { useEffect, useState } from 'react';
import { AgCharts } from 'ag-charts-react';
import type { AgCartesianChartOptions } from 'ag-charts-community';

type FeedbackEntry = {
    submitted_at: string | Date; // This will be converted to a Date object
    satisfaction: number;
    workload: number;
    manager_rating: number;
};
  

type Props = {
  department: string;
  timeframe?: string; // optional (e.g. '1m', '3m')
};

export default function DepartmentLineChart({ department, timeframe = '6m' }: Props) {
  const [data, setData] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/stats/department/${department}/timeline?timeframe=${timeframe}`);
      const rawData: FeedbackEntry[] = await res.json();
  
      // Convert submitted_at strings to Date objects
      const dataWithDateObjects = rawData.map((entry) => ({
        ...entry,
        submitted_at: new Date(entry.submitted_at),
      }));
  
      setData(dataWithDateObjects);
      setLoading(false);
      console.log('Fetched data:', dataWithDateObjects);
    };
  
    fetchData();
  }, [department, timeframe]);
  

  const chartOptions: AgCartesianChartOptions = {
    data,
    background: {
      fill: '#2b2b2b',
    },
    series: [
      {
        type: 'line',
        xKey: 'submitted_at',
        yKey: 'satisfaction',
        yName: 'Satisfaction',
        interpolation: {
          type: 'smooth',
        }
      },
      {
        type: 'line',
        xKey: 'submitted_at',
        yKey: 'workload',
        yName: 'Workload',
        interpolation: {
          type: 'smooth',
        }
      },
      {
        type: 'line',
        xKey: 'submitted_at',
        yKey: 'manager_rating',
        yName: 'Manager Rating',
        interpolation: {
          type: 'smooth',
        }
      },
    ],
    axes: [
      {
        type: 'time',
        position: 'bottom',
        title: { text: 'Date', color: '#ffffff' },
        label: { color: '#dddddd' },
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Score (1-10)', color: '#ffffff' },
        label: { color: '#dddddd' },
      },
    ],
    legend: { position: 'bottom', },
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  
  return (
      <AgCharts options={chartOptions} style={{height: 500}} />
  );
}