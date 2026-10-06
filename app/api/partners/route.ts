import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabase
      .from('partners')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data: partners, error } = await query;

    if (error) {
      console.error('Supabase partners fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ partners: partners || [] });
  } catch (error) {
    console.error('API partners GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.logo_url) {
      return NextResponse.json({ error: 'Logo URL is required' }, { status: 400 });
    }

    const { data: partner, error } = await supabaseAdmin
      .from('partners')
      .insert([{
        name: body.name || 'Partner',
        logo_url: body.logo_url,
        category: body.category || 'managing', // 'managing' or 'tech'
        display_order: body.display_order ?? 0,
        description: body.description || '',
        website_url: body.website_url || '',
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase partner create error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ partner }, { status: 201 });
  } catch (error) {
    console.error('API partner POST error:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
