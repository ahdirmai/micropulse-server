'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { SurveyType } from '@/lib/types'

export async function createSurvey(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const question = formData.get('question') as string
  const type = formData.get('type') as SurveyType
  const optionsJson = formData.get('options') as string

  const options = type === 'choice' && optionsJson
    ? JSON.parse(optionsJson).filter((o: string) => o.trim())
    : null

  const { data, error } = await supabase
    .from('surveys')
    .insert({
      user_id: user.id,
      title,
      question,
      type,
      options,
      status: 'active' as const,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  redirect(`/dashboard/surveys/${data.id}/embed`)
}
