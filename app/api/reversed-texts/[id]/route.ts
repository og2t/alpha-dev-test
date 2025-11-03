import { NextRequest, NextResponse } from 'next/server';
import { deleteReversedText } from '@/lib/supabase';

// DELETE - Delete a reversed text by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteReversedText(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete reversed text' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Reversed text deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting reversed text:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete reversed text' },
      { status: 500 }
    );
  }
}
