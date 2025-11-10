import { NextRequest, NextResponse } from 'next/server';
import { saveReversedText, getRecentReversedTexts } from '@/lib/supabase';
import { reverseWords } from '@/lib/text-utils';

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

// POST - Reverse text and save to database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { originalText } = body;

    if (!originalText || typeof originalText !== 'string') {
      return NextResponse.json(
        { success: false, error: 'originalText is required and must be a string' },
        { status: 400 }
      );
    }

    if (!originalText.trim()) {
      return NextResponse.json(
        { success: false, error: 'originalText cannot be empty' },
        { status: 400 }
      );
    }

    // Perform word reversal on server
    const reversedText = reverseWords(originalText);

    // Save to database
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
      reversedText: reversedText, // Return reversed text for client animation
    });
  } catch (error) {
    console.error('Error saving reversed text:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save reversed text' },
      { status: 500 }
    );
  }
}
