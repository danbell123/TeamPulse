import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received payload:', body);

    const {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Department: department,
      Satisfaction: satisfaction,
      Workload: workload,
      ManagerRating: managerRating,
      Suggestions: suggestions,
    } = body;

    const fullName = `${firstName} ${lastName}`;

    // Insert user if not already present
    const { error: insertError } = await supabase
      .from('users')
      .upsert([{ email, name: fullName, role: 'employee' }], { onConflict: 'email' });

    // Always insert feedback
    const { error: feedbackError } = await supabase.from('feedback_responses').insert([
      {
        user_email: email,
        department,
        satisfaction,
        workload,
        manager_rating: managerRating,
        suggestions,
      },
    ]);

    if (feedbackError) throw feedbackError;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[FEEDBACK POST ERROR]', err);
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}
