import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function mapMemberFromDb(member: Record<string, any>) {
  return {
    ...member,
    linkedin: member.linkedin_url ?? '',
  };
}

function mapMemberToDb(body: Record<string, any>) {
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
    const payload = mapMemberToDb(body);
    
    const { error } = await supabaseAdmin
      .from('team_members')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: member } = await supabaseAdmin
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();

    return NextResponse.json({ member: member ? mapMemberFromDb(member) : member });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { error } = await supabaseAdmin
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
