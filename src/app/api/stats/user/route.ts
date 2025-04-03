import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase/server';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  try {
    const [feedbackRes, userRes] = await Promise.all([
      supabase
        .from('feedback_responses')
        .select('*')
        .eq('user_email', email)
        .order('submitted_at', { ascending: true }),

      supabase
        .from('users')
        .select('name')
        .eq('email', email)
        .single()
    ]);

    if (userRes.error) throw userRes.error;
    if (feedbackRes.error) throw feedbackRes.error;

    return NextResponse.json({
      user_email: email,
      name: userRes.data.name,
      submissions: feedbackRes.data
    });
  } catch (err) {
    console.error('[STATS USER ERROR]', err);
    return NextResponse.json({ error: 'Failed to load user stats' }, { status: 500 });
  }
}
