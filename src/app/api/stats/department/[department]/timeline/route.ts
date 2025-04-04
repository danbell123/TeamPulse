import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  context: { params: { department: string } }
) {
  const { department } = context.params;
  const timeframe = req.nextUrl.searchParams.get('timeframe'); 

  if (!department) {
    return NextResponse.json({ error: 'Missing department name' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('feedback_responses')
      .select('submitted_at, satisfaction, workload, manager_rating')
      .eq('department', department)
      .order('submitted_at', { ascending: true });

    if (error) throw error;

    let filtered = data;

    if (timeframe && timeframe !== 'all') {
      const now = new Date();
      let cutoff = new Date();

      switch (timeframe) {
        case '1w':
          cutoff.setDate(now.getDate() - 7);
          break;
        case '1m':
          cutoff.setMonth(now.getMonth() - 1);
          break;
        case '3m':
          cutoff.setMonth(now.getMonth() - 3);
          break;
        case '6m':
          cutoff.setMonth(now.getMonth() - 6);
          break;
        case 'ytd':
          cutoff = new Date(now.getFullYear(), 0, 1);
          break;
        case '3y':
          cutoff.setFullYear(now.getFullYear() - 3);
          break;
        default:
          break;
      }

      filtered = data.filter(entry => new Date(entry.submitted_at) >= cutoff);
    }

    return NextResponse.json(filtered);
  } catch (err) {
    console.error('[STATS DEPT TIMELINE ERROR]', err);
    return NextResponse.json({ error: 'Failed to load timeline data' }, { status: 500 });
  }
}
