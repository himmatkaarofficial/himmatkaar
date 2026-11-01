import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DEFAULT_SETTINGS = {
  managing: { title: "Our Managing Partners", enabled: true },
  tech: { title: "Our Tech Partners", enabled: true }
};

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('category', '__settings__')
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Failed to fetch partner settings:', error);
    }

    let settings = DEFAULT_SETTINGS;
    if (data && data.logo_url) {
      try {
        const parsed = JSON.parse(data.logo_url);
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
        console.error('Error parsing settings JSON:', e);
      }
    }

    return NextResponse.json({ settings });
  } catch (err) {
    console.error('API partner settings GET error:', err);
    return NextResponse.json({ settings: DEFAULT_SETTINGS }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Fetch existing settings
    const { data: existing } = await supabaseAdmin
      .from('partners')
      .select('*')
      .eq('category', '__settings__')
      .maybeSingle();

    let currentSettings = DEFAULT_SETTINGS;
    if (existing && existing.logo_url) {
      try {
        currentSettings = { ...currentSettings, ...JSON.parse(existing.logo_url) };
      } catch {}
    }

    const updatedSettings = {
      managing: {
        title: body.managing?.title !== undefined ? body.managing.title : currentSettings.managing.title,
        enabled: body.managing?.enabled !== undefined ? Boolean(body.managing.enabled) : currentSettings.managing.enabled,
      },
      tech: {
        title: body.tech?.title !== undefined ? body.tech.title : currentSettings.tech.title,
        enabled: body.tech?.enabled !== undefined ? Boolean(body.tech.enabled) : currentSettings.tech.enabled,
      }
    };

    if (existing) {
      const { error } = await supabaseAdmin
        .from('partners')
        .update({
          logo_url: JSON.stringify(updatedSettings),
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      const { error } = await supabaseAdmin
        .from('partners')
        .insert([{
          name: 'section_settings',
          logo_url: JSON.stringify(updatedSettings),
          category: '__settings__',
          display_order: 0
        }]);

      if (error) throw error;
    }

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (err: any) {
    console.error('API partner settings PUT error:', err);
    return NextResponse.json({ error: err.message || 'Failed to update partner settings' }, { status: 500 });
  }
}

