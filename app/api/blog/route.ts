import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const published = searchParams.get('published');
    
    const parsedLimit = limitParam ? Number(limitParam) : undefined;
    const limit =
      typeof parsedLimit === 'number' && Number.isInteger(parsedLimit) && parsedLimit > 0
        ? parsedLimit
        : undefined;

    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });

    // Filter by published status if specified
    if (published !== null) {
      query = query.eq('published', published === 'true');
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data: posts, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ posts: posts || [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data: post, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
