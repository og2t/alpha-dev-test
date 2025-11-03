import { NextRequest, NextResponse } from 'next/server';
import { invokeLambda } from '@/lib/aws-lambda';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { functionName, payload } = body;

    if (!functionName) {
      return NextResponse.json(
        { error: 'Function name is required' },
        { status: 400 }
      );
    }

    const result = await invokeLambda({
      functionName,
      payload,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Lambda invocation error:', error);
    return NextResponse.json(
      { error: 'Failed to invoke Lambda function' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to invoke Lambda functions',
    example: {
      functionName: 'your-function-name',
      payload: { key: 'value' },
    },
  });
}
