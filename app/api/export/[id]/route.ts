import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: survey } = await supabase
    .from('surveys')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!survey) {
    return NextResponse.json({ error: 'Survey not found' }, { status: 404 })
  }

  const { data: responses } = await supabase
    .from('responses')
    .select('id, answer, page_url, created_at')
    .eq('survey_id', id)
    .order('created_at', { ascending: false })

  if (!responses) {
    return NextResponse.json({ error: 'No responses found' }, { status: 404 })
  }

  const csv = [
    ['ID', 'Answer', 'Page URL', 'Created At'].join(','),
    ...responses.map(r => [
      r.id,
      `"${r.answer.replace(/"/g, '""')}"`,
      `"${r.page_url.replace(/"/g, '""')}"`,
      new Date(r.created_at).toISOString()
    ].join(','))
  ].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="survey-${id}-responses.csv"`
    }
  })
}
