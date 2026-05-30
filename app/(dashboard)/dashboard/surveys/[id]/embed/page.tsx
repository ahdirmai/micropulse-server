import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EmbedClient from './embed-client'

export default async function EmbedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: survey } = await supabase
    .from('surveys')
    .select('*')
    .eq('id', id)
    .single()

  if (!survey) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_WIDGET_BASE_URL || 'http://localhost:3001'
  const embedCode = `<script src="${baseUrl}/widget.js" data-survey-id="${id}" async></script>`

  return <EmbedClient embedCode={embedCode} surveyId={id} baseUrl={baseUrl} />
}
