import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface HeroSlide {
  id: string;
  section: 'home' | 'team' | 'launchpad';
  title?: string;
  image?: string;
  display_order?: number;
  created_at?: string;
}

let memoryHeroSlides: HeroSlide[] = [
  { id: 'home-1', section: 'home', title: 'Community Slide 1', image: '/home-page-carosel/1.jpg', display_order: 1 },
  { id: 'home-2', section: 'home', title: 'Community Slide 2', image: '/home-page-carosel/2.jpg', display_order: 2 },
  { id: 'home-3', section: 'home', title: 'Community Slide 3', image: '/home-page-carosel/3.jpg', display_order: 3 },
  { id: 'home-4', section: 'home', title: 'Community Slide 4', image: '/home-page-carosel/4.jpeg', display_order: 4 },
  { id: 'home-5', section: 'home', title: 'Community Slide 5', image: '/home-page-carosel/5.jpeg', display_order: 5 },
  { id: 'team-1', section: 'team', title: 'Executive Team Showcase 1', image: '/team-slides/team-slide-1.jpg', display_order: 1 },
  { id: 'team-2', section: 'team', title: 'Executive Team Showcase 2', image: '/team-slides/team-slide-2.jpg', display_order: 2 },
  { id: 'team-3', section: 'team', title: 'Executive Team Showcase 3', image: '/team-slides/team-slide-3.jpg', display_order: 3 },
  { id: 'team-4', section: 'team', title: 'Executive Team Showcase 4', image: '/team-slides/team-slide-4.jpg', display_order: 4 },
  { id: 'lp-1', section: 'launchpad', title: 'LaunchPad Bootcamp 1', image: '/launchpad-slides/launchpad-slide-1-v2.jpg', display_order: 1 },
  { id: 'lp-2', section: 'launchpad', title: 'LaunchPad Bootcamp 2', image: '/launchpad-slides/launchpad-slide-2.jpg', display_order: 2 },
  { id: 'lp-3', section: 'launchpad', title: 'LaunchPad Bootcamp 3', image: '/launchpad-slides/launchpad-slide-3.jpg', display_order: 3 },
  { id: 'lp-4', section: 'launchpad', title: 'LaunchPad Bootcamp 4', image: '/launchpad-slides/launchpad-slide-4.png', display_order: 4 },
  { id: 'lp-5', section: 'launchpad', title: 'LaunchPad Bootcamp 5', image: '/launchpad-slides/launchpad-slide-5.jpg', display_order: 5 },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    let dbSlides: HeroSlide[] | null = null;
    try {
      let query = supabase
        .from('hero_slides')
        .select('*')
        .order('display_order', { ascending: true });

      if (section) {
        query = query.eq('section', section);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        dbSlides = data as HeroSlide[];
      }
    } catch {
      // Supabase table fallback
    }

    let slides = dbSlides || memoryHeroSlides;
    if (section) {
      slides = slides.filter((s) => s.section === section);
    }

    return NextResponse.json({ slides });
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return NextResponse.json({ error: 'Failed to fetch hero slides' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { section = 'home', title = '', image = '' } = body;

    const defaultFallbackImage =
      section === 'home'
        ? '/home-page-carosel/1.jpg'
        : section === 'team'
        ? '/team-slides/team-slide-1.jpg'
        : '/launchpad-slides/launchpad-slide-1-v2.jpg';

    const finalImage = (image && image.trim()) ? image.trim() : defaultFallbackImage;

    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      section,
      title: title || `${section.toUpperCase()} Hero Slide`,
      image: finalImage,
      display_order: memoryHeroSlides.length + 1,
      created_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabaseAdmin
        .from('hero_slides')
        .insert([{
          section: newSlide.section,
          title: newSlide.title,
          image: newSlide.image,
          display_order: newSlide.display_order,
        }])
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ slide: data }, { status: 201 });
      }
    } catch {
      // Fallback
    }

    memoryHeroSlides.push(newSlide);
    return NextResponse.json({ slide: newSlide }, { status: 201 });
  } catch (error) {
    console.error('Error creating hero slide:', error);
    return NextResponse.json({ error: 'Failed to create hero slide' }, { status: 500 });
  }
}
