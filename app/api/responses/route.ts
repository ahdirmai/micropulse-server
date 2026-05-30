import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

/**
 * POST /api/responses
 *
 * Submit a survey response.
 * Public endpoint - no authentication required.
 *
 * @public No authentication required
 * @cors Enabled - allows any origin (Access-Control-Allow-Origin: *)
 * @ratelimit 100 responses/month for free tier, unlimited for pro tier
 *
 * @body {object} Request body
 * @body.survey_id {string} Survey UUID (required)
 * @body.answer {string} User's answer, max 500 characters (required)
 * @body.respondent_id {string} Unique respondent identifier (required)
 * @body.page_url {string} URL where survey was answered (required)
 *
 * @returns {200} Success - Response submitted
 * @returns {400} Bad request - Missing fields, invalid data, or survey inactive
 * @returns {403} Forbidden - Monthly response limit reached (free tier)
 * @returns {500} Internal server error
 *
 * @example
 * // Submit rating response
 * fetch('https://yourdomain.com/api/responses', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     survey_id: 'abc-123-xyz',
 *     answer: '5',
 *     respondent_id: 'r_unique123',
 *     page_url: 'https://example.com/page'
 *   })
 * })
 *
 * @example
 * // Success response
 * { "success": true }
 *
 * @example
 * // Rate limit error (403)
 * {
 *   "error": "Monthly response limit reached. Upgrade to Pro for unlimited responses."
 * }
 *
 * @example
 * // Validation error (400)
 * { "error": "Missing required fields" }
 * { "error": "Answer too long (max 500 characters)" }
 * { "error": "Survey not active" }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { survey_id, answer, respondent_id, page_url } = body

    if (!survey_id || !answer || !respondent_id || !page_url) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: corsHeaders }
      )
    }

    if (answer.length > 500) {
      return NextResponse.json(
        { error: 'Answer too long (max 500 characters)' },
        { status: 400, headers: corsHeaders }
      )
    }

    const supabase = await createClient()

    // Get survey with user info
    const { data: survey } = await supabase
      .from('surveys')
      .select('status, user_id')
      .eq('id', survey_id)
      .single()

    if (!survey || survey.status !== 'active') {
      return NextResponse.json(
        { error: 'Survey not active' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Check user's plan and response count
    const { data: settings } = await supabase
      .from('user_settings')
      .select('tier')
      .eq('user_id', survey.user_id)
      .single()

    const userTier = settings?.tier || 'free'

    // Count monthly responses for free tier users
    if (userTier === 'free') {
      const { data: monthlyCount } = await supabase.rpc(
        'count_user_monthly_responses',
        { p_user_id: survey.user_id }
      )

      if (monthlyCount && monthlyCount >= 100) {
        return NextResponse.json(
          { error: 'Monthly response limit reached. Upgrade to Pro for unlimited responses.' },
          { status: 403, headers: corsHeaders }
        )
      }
    }

    const { error } = await supabase
      .from('responses')
      .insert({
        survey_id,
        answer,
        respondent_id,
        page_url,
      })

    if (error) {
      console.error('Error inserting response:', error)
      return NextResponse.json(
        { error: 'Failed to save response' },
        { status: 500, headers: corsHeaders }
      )
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    console.error('Error processing response:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}

/**
 * OPTIONS /api/responses
 *
 * Handles CORS preflight requests for response submission endpoint.
 *
 * @cors Preflight handler - returns CORS headers
 * @returns {200} Success with CORS headers allowing POST requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}
