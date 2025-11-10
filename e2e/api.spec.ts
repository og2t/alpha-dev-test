import { test, expect } from '@playwright/test';

test.describe('API Integration', () => {
  let baseURL: string;

  test.beforeAll(async ({ }, testInfo) => {
    baseURL = testInfo.project.use.baseURL || 'http://localhost:3000';
  });

  test('POST /api/reversed-texts should reverse and save text', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/reversed-texts`, {
      data: {
        originalText: 'hello world',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.reversedText).toBe('olleh dlrow');
    expect(data.data).toHaveProperty('id');
    expect(data.data.original_text).toBe('hello world');
    expect(data.data.reversed_text).toBe('olleh dlrow');
  });

  test('POST /api/reversed-texts should handle punctuation correctly', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/reversed-texts`, {
      data: {
        originalText: 'Hello, world!',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.reversedText).toBe('olleH, dlrow!');
  });

  test('POST /api/reversed-texts should handle multiline text', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/reversed-texts`, {
      data: {
        originalText: 'line1\nline2\nline3',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.reversedText).toBe('1enil\n2enil\n3enil');
  });

  test('POST /api/reversed-texts should reject empty text', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/reversed-texts`, {
      data: {
        originalText: '',
      },
    });

    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toBeTruthy();
  });

  test('POST /api/reversed-texts should reject whitespace-only text', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/reversed-texts`, {
      data: {
        originalText: '   ',
      },
    });

    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toBe('originalText cannot be empty');
  });

  test('POST /api/reversed-texts should reject missing originalText', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/reversed-texts`, {
      data: {},
    });

    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain('originalText is required');
  });

  test('POST /api/reversed-texts should reject non-string originalText', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/reversed-texts`, {
      data: {
        originalText: 12345,
      },
    });

    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain('must be a string');
  });

  test('GET /api/reversed-texts should return recent reversals', async ({ request }) => {
    // First, create a reversal
    await request.post(`${baseURL}/api/reversed-texts`, {
      data: {
        originalText: 'test for get',
      },
    });

    // Then fetch reversals
    const response = await request.get(`${baseURL}/api/reversed-texts?limit=10`);

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);
    expect(data.count).toBe(data.data.length);

    // Check structure of first item
    const firstItem = data.data[0];
    expect(firstItem).toHaveProperty('id');
    expect(firstItem).toHaveProperty('original_text');
    expect(firstItem).toHaveProperty('reversed_text');
    expect(firstItem).toHaveProperty('created_at');
  });

  test('GET /api/reversed-texts should respect limit parameter', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/reversed-texts?limit=5`);

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.length).toBeLessThanOrEqual(5);
  });

  test('DELETE /api/reversed-texts/:id should delete a reversal', async ({ request }) => {
    // First, create a reversal
    const createResponse = await request.post(`${baseURL}/api/reversed-texts`, {
      data: {
        originalText: 'test for delete',
      },
    });

    const createData = await createResponse.json();
    const id = createData.data.id;

    // Then delete it
    const deleteResponse = await request.delete(`${baseURL}/api/reversed-texts/${id}`);

    expect(deleteResponse.ok()).toBeTruthy();

    const deleteData = await deleteResponse.json();
    expect(deleteData.success).toBe(true);
  });
});
