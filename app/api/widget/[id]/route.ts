import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * GET /api/widget/{id}
 *
 * Fetch survey data for embedding in widgets.
 * Public endpoint - no authentication required.
 *
 * @public No authentication required
 * @cors Enabled - allows any origin (Access-Control-Allow-Origin: *)
 *
 * @param {string} id - Survey UUID from route parameter
 *
 * @returns {200} Success - Returns survey data
 * @returns {404} Survey not found or not active
 *
 * @example
 * // Fetch survey data
 * fetch('https://yourdomain.com/api/widget/abc-123-xyz')
 *   .then(r => r.json())
 *   .then(data => {
 *     console.log(data.question) // "How would you rate..."
 *     console.log(data.type)     // "rating"
 *     console.log(data.options)  // null (for rating type)
 *   })
 *
 * @example
 * // Response format
 * {
 *   "question": "How would you rate your experience?",
 *   "type": "rating" | "nps" | "choice" | "text",
 *   "options": string[] | null
 * }
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: survey, error } = await supabase
    .from('surveys')
    .select('question, type, options, status')
    .eq('id', id)
    .single()

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (error || !survey) {
    return NextResponse.json(
      { error: 'Survey not found' },
      { status: 404, headers: corsHeaders }
    )
  }

  if (survey.status !== 'active') {
    return NextResponse.json(
      { error: 'Survey not active' },
      { status: 404, headers: corsHeaders }
    )
  }

  return NextResponse.json(
    {
      question: survey.question,
      type: survey.type,
      options: survey.options,
    },
    { headers: corsHeaders }
  )
}

/**
 * OPTIONS /api/widget/{id}
 *
 * Handles CORS preflight requests for the widget endpoint.
 *
 * @cors Preflight handler - returns CORS headers
 * @returns {200} Success with CORS headers
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
