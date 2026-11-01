import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatePayload: Record<string, any> = {};
    const allowedKeys = ['name', 'logo_url', 'category', 'display_order', 'description', 'website_url'];
    for (const key of allowedKeys) {
      if (body[key] !== undefined) {
        updatePayload[key] = body[key];
      }
    }

    let { data: partner, error } = await supabaseAdmin
      .from('partners')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error && (error.message?.includes('description') || error.message?.includes('website_url'))) {
      delete updatePayload.description;
      delete updatePayload.website_url;
      const retry = await supabaseAdmin
        .from('partners')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();
      partner = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error('Supabase partner update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ partner });
  } catch (error) {
    console.error('API partner PUT error:', error);
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from('partners')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase partner delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API partner DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
