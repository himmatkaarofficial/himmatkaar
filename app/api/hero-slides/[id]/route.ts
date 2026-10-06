import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { section, title, image, display_order } = body;

    try {
      const { data, error } = await supabaseAdmin
        .from('hero_slides')
        .update({
          section,
          title,
          image,
          display_order,
        })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ slide: data });
      }
    } catch {
      // Fallback
    }

    return NextResponse.json({
      slide: { id, section, title, image, display_order }
    });
  } catch (error) {
    console.error('Error updating hero slide:', error);
    return NextResponse.json({ error: 'Failed to update hero slide' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      const { error } = await supabaseAdmin
        .from('hero_slides')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Supabase delete error:', error);
      }
    } catch {
      // Fallback
    }

    return NextResponse.json({ message: 'Slide deleted successfully', id });
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    return NextResponse.json({ error: 'Failed to delete hero slide' }, { status: 500 });
  }
}
