export type SurveyType = 'rating' | 'nps' | 'choice' | 'text'
export type SurveyStatus = 'active' | 'paused' | 'archived'

export interface Survey {
  id: string
  user_id: string
  title: string
  question: string
  type: SurveyType
  options: string[] | null
  status: SurveyStatus
  created_at: string
}

export interface Response {
  id: string
  survey_id: string
  answer: string
  respondent_id: string
  page_url: string
  created_at: string
}

export interface SurveyWithStats extends Survey {
  response_count: number
  average?: number
}
