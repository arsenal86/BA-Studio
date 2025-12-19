
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Use vi.hoisted to solve the hoisting issue
const { generateContentMock } = vi.hoisted(() => {
  return { generateContentMock: vi.fn() };
});

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class {
      models = {
        generateContent: generateContentMock,
      };
      constructor() {}
    },
  };
});

// Import handler AFTER mocking
import { handler } from './gemini';

const originalEnv = process.env;

describe('gemini function handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, GEMINI_API_KEY: 'test-key' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return 400 if body is missing', async () => {
    const event = {} as any;
    const result = await handler(event, {} as any, () => {});

    expect(result?.statusCode).toBe(400);
    expect(JSON.parse(result?.body || '{}')).toEqual({ error: 'Missing request body' });
  });

  it('should return 400 if mode is invalid', async () => {
    const event = {
      body: JSON.stringify({ mode: 'invalidMode' }),
    } as any;
    const result = await handler(event, {} as any, () => {});

    expect(result?.statusCode).toBe(400);
    expect(JSON.parse(result?.body || '{}')).toEqual({ error: 'Invalid mode' });
  });

  it('should handle internal errors securely', async () => {
    generateContentMock.mockRejectedValue(new Error('Sensitive database info leaked'));

    const event = {
      body: JSON.stringify({ mode: 'analyzeUserStory', userStory: 'As a user...' }),
    } as any;

    const result = await handler(event, {} as any, () => {});

    expect(result?.statusCode).toBe(500);
    const body = JSON.parse(result?.body || '{}');

    // VERIFIED SECURITY FIX:
    expect(body.error).toBe('An internal server error occurred.');
    expect(body.error).not.toContain('Sensitive database info leaked');
  });

  it('should return 400 for missing parameters', async () => {
     const event = {
      body: JSON.stringify({ mode: 'analyzeUserStory' }), // missing userStory
    } as any;

    const result = await handler(event, {} as any, () => {});

    expect(result?.statusCode).toBe(400);
    const body = JSON.parse(result?.body || '{}');
    expect(body.error).toBe('Missing userStory parameter');
  });
});
