import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DEFAULT_SETTINGS = {
  managing: { title: "Our Managing Partners", enabled: true },
  tech: { title: "Our Tech Partners", enabled: true }
};

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

    const { data: allData, error } = await query;

    if (error) {
      console.error('Supabase partners fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const partners = (allData || []).filter((p) => p.category !== '__settings__');
    const settingsRow = (allData || []).find((p) => p.category === '__settings__');

    let settings = DEFAULT_SETTINGS;
    if (settingsRow && settingsRow.logo_url) {
      try {
        const parsed = JSON.parse(settingsRow.logo_url);
        settings = {
          managing: {
            title: parsed.managing?.title || DEFAULT_SETTINGS.managing.title,
            enabled: parsed.managing?.enabled ?? DEFAULT_SETTINGS.managing.enabled,
          },
          tech: {
            title: parsed.tech?.title || DEFAULT_SETTINGS.tech.title,
            enabled: parsed.tech?.enabled ?? DEFAULT_SETTINGS.tech.enabled,
          }
        };
      } catch (e) {
        console.error('Error parsing settings in GET /api/partners:', e);
      }
    }

    return NextResponse.json({ partners, settings });
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

    const insertPayload: Record<string, any> = {
      name: body.name || 'Partner',
      logo_url: body.logo_url,
      category: body.category || 'managing', // 'managing' or 'tech'
      display_order: body.display_order ?? 0,
    };

    if (body.description) insertPayload.description = body.description;
    if (body.website_url) insertPayload.website_url = body.website_url;

    let { data: partner, error } = await supabaseAdmin
      .from('partners')
      .insert([insertPayload])
      .select()
      .single();

    // If description or website_url column doesn't exist in partners table, retry with standard columns
    if (error && (error.message?.includes('description') || error.message?.includes('website_url'))) {
      const fallbackPayload = {
        name: body.name || 'Partner',
        logo_url: body.logo_url,
        category: body.category || 'managing',
        display_order: body.display_order ?? 0,
      };

      const retry = await supabaseAdmin
        .from('partners')
        .insert([fallbackPayload])
        .select()
        .single();

      partner = retry.data;
      error = retry.error;
    }

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
