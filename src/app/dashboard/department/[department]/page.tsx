'use client';

import { useParams } from 'next/navigation';
import DepartmentLineChart from '@/components/departmentDataVis/DepartmentLineChart';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const timeframes = [
  { label: 'Last Week', value: '1w' },
  { label: 'Last Month', value: '1m' },
  { label: 'Last 3 Months', value: '3m' },
  { label: 'Last 6 Months', value: '6m' },
  { label: 'Year-to-Date', value: 'ytd' },
  { label: 'Last 3 Years', value: '3y' },
  { label: 'All Time', value: 'all' },
];

const departments = [
  { label: 'Accounting', value: 'accounting' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Management', value: 'management' },
  { label: 'IT', value: 'it' },
  { label: 'Sales', value: 'sales' },
];

export default function DepartmentPage() {
  const params = useParams();
  const department = params?.department as string;
  const [timeframe, setTimeframe] = useState('6m');
  const router = useRouter();

  if (!department) {
    return <p className="text-white">Department not found.</p>;
  }

  return (
    <div className="p-6 text-white min-h-screen bg-black space-y-6">
      <h1 className="text-3xl font-bold capitalize">YourCompany {department} Department Overview</h1>

      <button className="bg-blue-700 hover:underline p-2" onClick={() => router.push('/dashboard')}>Back to Dashboard</button>

      <div className='flex flex-row gap-4'>
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

        <div>
          <label className="block font-medium mb-1 text-gray-300">Change Department:</label>
          <select
            value={department}
            onChange={(e) => router.push(`/dashboard/department/${e.target.value}`)}
            className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          >
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Feedback Trends Over Time</h2>
        <DepartmentLineChart department={department} timeframe={timeframe} />
      </section>
    </div>
  );
}