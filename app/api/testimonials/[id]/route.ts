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
    if (body.name !== undefined) updatePayload.name = body.name;
    if (body.role !== undefined) updatePayload.role = body.role;
    if (body.company !== undefined) updatePayload.company = body.company;
    if (body.avatar_url !== undefined) updatePayload.avatar_url = body.avatar_url;
    if (body.rating !== undefined) updatePayload.rating = body.rating;
    if (body.feedback !== undefined) updatePayload.feedback = body.feedback;
    else if (body.text !== undefined) updatePayload.feedback = body.text;
    if (body.display_order !== undefined) updatePayload.display_order = body.display_order;
    if (body.is_active !== undefined) updatePayload.is_active = body.is_active;

    const { data: testimonial, error } = await supabaseAdmin
      .from('testimonials')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase testimonial update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ testimonial });
  } catch (error) {
    console.error('API testimonial PUT error:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase testimonial delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API testimonial DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
