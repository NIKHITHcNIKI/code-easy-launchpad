import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const RATE_LIMIT = {
  maxPerIP: 3,
  windowHours: 24
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown'

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Check rate limit
    const windowStart = new Date()
    windowStart.setHours(windowStart.getHours() - RATE_LIMIT.windowHours)
    
    const { count, error: countError } = await supabaseAdmin
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('identifier', clientIP)
      .eq('action', 'review_submit')
      .gte('created_at', windowStart.toISOString())

    if (countError) {
      console.error('Rate limit check error:', countError)
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (count && count >= RATE_LIMIT.maxPerIP) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. You can submit up to 3 reviews per day. Please try again tomorrow.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse and validate request body
    const body = await req.json()
    const { student_name, rating, comment } = body

    // Validate student_name
    if (!student_name || typeof student_name !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    const trimmedName = student_name.trim()
    if (trimmedName.length === 0 || trimmedName.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Name must be between 1 and 100 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate rating
    if (typeof rating !== 'number' || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return new Response(
        JSON.stringify({ error: 'Rating must be an integer between 1 and 5' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate comment
    if (!comment || typeof comment !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Comment is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    const trimmedComment = comment.trim()
    if (trimmedComment.length === 0 || trimmedComment.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Comment must be between 1 and 1000 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Record rate limit entry
    await supabaseAdmin
      .from('rate_limits')
      .insert([{ identifier: clientIP, action: 'review_submit' }])

    // Insert the review
    const { error: insertError } = await supabaseAdmin
      .from('reviews')
      .insert([{
        student_name: trimmedName,
        rating,
        comment: trimmedComment,
        status: 'pending'
      }])

    if (insertError) {
      console.error('Review insert error:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to submit review. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ message: 'Review submitted successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
