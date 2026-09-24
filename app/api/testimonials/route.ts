import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase testimonials fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ testimonials: testimonials || [] });
  } catch (error) {
    console.error('API testimonials GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || (!body.feedback && !body.text)) {
      return NextResponse.json({ error: 'Name and feedback are required' }, { status: 400 });
    }

    const { data: testimonial, error } = await supabaseAdmin
      .from('testimonials')
      .insert([{
        name: body.name,
        role: body.role || '',
        company: body.company || '',
        avatar_url: body.avatar_url || null,
        rating: body.rating ?? 5,
        feedback: body.feedback || body.text || '',
        display_order: body.display_order ?? 0,
        is_active: body.is_active ?? true,
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase testimonial create error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error) {
    console.error('API testimonial POST error:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
