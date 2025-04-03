import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase/server';
import dayjs from 'dayjs';

export async function GET(req: NextRequest) {
  const timeframe = req.nextUrl.searchParams.get('timeframe') ?? 'all';

  let fromDate: string | null = null;

  const now = dayjs();
  switch (timeframe) {
    case '1w':
      fromDate = now.subtract(1, 'week').toISOString();
      break;
    case '1m':
      fromDate = now.subtract(1, 'month').toISOString();
      break;
    case '3m':
      fromDate = now.subtract(3, 'month').toISOString();
      break;
    case '6m':
      fromDate = now.subtract(6, 'month').toISOString();
      break;
    case 'ytd':
      fromDate = now.startOf('year').toISOString();
      break;
    case '3y':
      fromDate = now.subtract(3, 'year').toISOString();
      break;
    case 'all':
      fromDate = null;
      break;
  }

  try {
    const query = supabase
      .from('feedback_responses')
      .select('department, satisfaction, workload, manager_rating');

    if (fromDate) {
      query.gte('submitted_at', fromDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    const statsMap: Record<string, {
      satisfaction: number[],
      workload: number[],
      manager_rating: number[]
    }> = {};

    data.forEach(row => {
      if (!row.department) return;

      if (!statsMap[row.department]) {
        statsMap[row.department] = {
          satisfaction: [],
          workload: [],
          manager_rating: [],
        };
      }

      statsMap[row.department].satisfaction.push(row.satisfaction);
      statsMap[row.department].workload.push(row.workload);
      statsMap[row.department].manager_rating.push(row.manager_rating);
    });

    const result = Object.entries(statsMap).map(([department, values]) => ({
      department,
      avg_satisfaction: average(values.satisfaction),
      avg_workload: average(values.workload),
      avg_manager_rating: average(values.manager_rating),
    }));

    return NextResponse.json(groupedAverages(data));
  } catch (err) {
    console.error('[STATS OVERVIEW ERROR]', err);
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 });
  }
}

function groupedAverages(data: any[]) {
  const statsMap: Record<string, any> = {};
  for (const row of data) {
    if (!row.department) continue;
    if (!statsMap[row.department]) {
      statsMap[row.department] = {
        satisfaction: [],
        workload: [],
        manager_rating: [],
      };
    }
    statsMap[row.department].satisfaction.push(row.satisfaction);
    statsMap[row.department].workload.push(row.workload);
    statsMap[row.department].manager_rating.push(row.manager_rating);
  }

  return Object.entries(statsMap).map(([department, scores]) => ({
    department,
    avg_satisfaction: average(scores.satisfaction),
    avg_workload: average(scores.workload),
    avg_manager_rating: average(scores.manager_rating),
    amount_of_responses: scores.satisfaction.length,
  }));
}

function average(arr: number[]) {
  if (!arr.length) return 0;
  return Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10;
}