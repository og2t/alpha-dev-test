import { Lambda } from 'aws-sdk';

// Initialize Lambda client
const lambda = new Lambda({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export interface LambdaInvokeParams {
  functionName: string;
  payload?: any;
  invocationType?: 'Event' | 'RequestResponse' | 'DryRun';
}

/**
 * Invoke an AWS Lambda function
 * @param params - Lambda invocation parameters
 * @returns The Lambda function response
 */
export async function invokeLambda({
  functionName,
  payload = {},
  invocationType = 'RequestResponse',
}: LambdaInvokeParams) {
  try {
    const params = {
      FunctionName: functionName,
      InvocationType: invocationType,
      Payload: JSON.stringify(payload),
    };

    const result = await lambda.invoke(params).promise();

    if (result.FunctionError) {
      throw new Error(`Lambda function error: ${result.FunctionError}`);
    }

    if (result.Payload) {
      return JSON.parse(result.Payload.toString());
    }

    return null;
  } catch (error) {
    console.error('Error invoking Lambda function:', error);
    throw error;
  }
}

/**
 * Invoke a Lambda function asynchronously (fire and forget)
 * @param functionName - The name of the Lambda function
 * @param payload - The payload to send to the function
 */
export async function invokeLambdaAsync(
  functionName: string,
  payload?: any
): Promise<void> {
  await invokeLambda({
    functionName,
    payload,
    invocationType: 'Event',
  });
}
