import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function mapAmbassadorFromDb(ambassador: Record<string, any>) {
  return {
    ...ambassador,
    linkedin: ambassador.linkedin_url ?? '',
  };
}

function mapAmbassadorToDb(body: Record<string, any>) {
  const { linkedin, linkedin_url, ...rest } = body;
  return {
    ...rest,
    linkedin_url: linkedin_url ?? linkedin ?? null,
  };
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const payload = mapAmbassadorToDb(body);
    
    const { error } = await supabaseAdmin
      .from('ambassadors')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: ambassador } = await supabaseAdmin
      .from('ambassadors')
      .select('*')
      .eq('id', id)
      .single();

    return NextResponse.json({ ambassador: ambassador ? mapAmbassadorFromDb(ambassador) : ambassador });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to update ambassador' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { error } = await supabaseAdmin
      .from('ambassadors')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Ambassador deleted successfully' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to delete ambassador' }, { status: 500 });
  }
}
