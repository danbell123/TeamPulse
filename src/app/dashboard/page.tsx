'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

// AG Charts
import { AgCharts } from 'ag-charts-react';
import type { AgCartesianChartOptions } from 'ag-charts-community';

// AG Grid
import { AgGridReact } from 'ag-grid-react';
import {
  ClientSideRowModelModule,
  themeBalham,
  ModuleRegistry,
  themeQuartz,
  colorSchemeDark,
} from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import type { AgGridReactProps } from 'ag-grid-react';

// Register required modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

type StatRow = {
  department: string;
  avg_satisfaction: number;
  avg_workload: number;
  avg_manager_rating: number;
};

export default function DashboardOverview() {
  const [data, setData] = useState<StatRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all');
  const router = useRouter();

  const timeframes = [
    { label: 'Last Week', value: '1w' },
    { label: 'Last Month', value: '1m' },
    { label: 'Last 3 Months', value: '3m' },
    { label: 'Last 6 Months', value: '6m' },
    { label: 'Year-to-Date', value: 'ytd' },
    { label: 'Last 3 Years', value: '3y' },
    { label: 'All Time', value: 'all' },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const res = await fetch(`/api/stats/overview?timeframe=${timeframe}`);
      const result = await res.json();
      setData(result);
      setLoading(false);
    };

    fetchStats();
  }, [timeframe]);

  const chartOptions: AgCartesianChartOptions = useMemo(() => ({
    data,
    background: {
      fill: '#2b2b2b',
    },
    series: [
      {
        type: 'bar',
        xKey: 'department',
        yKey: 'avg_satisfaction',
        yName: 'Satisfaction',
      },
      {
        type: 'bar',
        xKey: 'department',
        yKey: 'avg_workload',
        yName: 'Workload',
      },
      {
        type: 'bar',
        xKey: 'department',
        yKey: 'avg_manager_rating',
        yName: 'Manager Rating',
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: { text: 'Department', color: '#ffffff' },
        label: { color: '#dddddd' },
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Score', color: '#ffffff' },
        label: { color: '#dddddd' },
      },
    ],
    legend: {
      item: {
        label: {
          color: '#ffffff',
        },
      },
    },
  }), [data]);

  const gridColumns: (ColDef<any, any> | ColGroupDef<any>)[] = [
    { headerName: 'Department', field: 'department', sortable: true, filter: true, onCellClicked: (event) => router.push(`/dashboard/department/${event.value}`) },
    { headerName: 'Avg. Satisfaction', field: 'avg_satisfaction', sortable: true, },
    { headerName: 'Avg. Workload', field: 'avg_workload', sortable: true },
    { headerName: 'Avg. Manager Rating', field: 'avg_manager_rating', sortable: true },
    { headerName: 'Amount of Responses', field: 'amount_of_responses', sortable: true, filter: true },
  ];

  const myTheme = themeQuartz.withPart(colorSchemeDark);

  return (
    <div className="p-6 text-white bg-black min-h-screen space-y-6">
      <h1 className="text-3xl font-bold">YourCompany Employee Overview</h1>

      <div>
        <label className="block font-medium mb-1 text-gray-300">Filter by Timeframe:</label>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        >
          {timeframes.map((tf) => (
            <option key={tf.value} value={tf.value}>
              {tf.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading data...</p>
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-semibold text-gray-200 mb-1">Department Data</h2>
            <p className='mb-3'>Click on a department name to view in depth data.</p>
            <div style={{ width: '100%' }} className='rounded'>
              <AgGridReact
                rowData={data}
                columnDefs={gridColumns}
                theme={myTheme}
                domLayout='autoHeight'
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-200 mb-3">Department Comparison</h2>
            <div className='rounded-xl overflow-clip'>
              <AgCharts options={chartOptions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}