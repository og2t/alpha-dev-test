import { NextRequest, NextResponse } from 'next/server';
import { saveReversedText, getRecentReversedTexts } from '@/lib/supabase';

// GET - Fetch recent reversed texts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const texts = await getRecentReversedTexts(limit);

    return NextResponse.json({
      success: true,
      data: texts,
      count: texts.length,
    });
  } catch (error) {
    console.error('Error fetching reversed texts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reversed texts' },
      { status: 500 }
    );
  }
}

// POST - Save a new reversed text
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { originalText, reversedText } = body;

    if (!originalText || !reversedText) {
      return NextResponse.json(
        { success: false, error: 'originalText and reversedText are required' },
        { status: 400 }
      );
    }

    const savedText = await saveReversedText(originalText, reversedText);

    if (!savedText) {
      return NextResponse.json(
        { success: false, error: 'Failed to save reversed text' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: savedText,
    });
  } catch (error) {
    console.error('Error saving reversed text:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save reversed text' },
      { status: 500 }
    );
  }
}
