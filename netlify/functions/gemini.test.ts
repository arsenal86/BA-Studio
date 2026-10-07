// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { HandlerEvent, HandlerContext } from '@netlify/functions';

// vi.mock is hoisted above imports, so the mock fn must be hoisted too.
const { generateContentMock } = vi.hoisted(() => ({
  generateContentMock: vi.fn(),
}));

vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    models = { generateContent: generateContentMock };
  },
}));

import { handler } from './gemini';

const call = async (body?: unknown) => {
  const event = {
    body:
      body === undefined
        ? null
        : typeof body === 'string'
          ? body
          : JSON.stringify(body),
  } as HandlerEvent;
  const result = await handler(event, {} as HandlerContext);
  if (!result) throw new Error('Handler returned no response');
  return {
    statusCode: result.statusCode,
    body: JSON.parse(result.body ?? '{}'),
  };
};

const originalEnv = process.env;

describe('gemini function handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, GEMINI_API_KEY: 'test-key' };
    generateContentMock.mockResolvedValue({ text: '# Report' });
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns 400 when the body is missing', async () => {
    const res = await call();
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Missing request body');
  });

  it('returns 400, not 500, for malformed JSON', async () => {
    const res = await call('{not json');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Request body must be valid JSON');
  });

  it('returns 400 for an unknown mode', async () => {
    const res = await call({ mode: 'invalidMode' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid mode');
  });

  it('returns 400 when a required parameter is missing', async () => {
    const res = await call({ mode: 'analyzeUserStory' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Missing userStory parameter');
    expect(generateContentMock).not.toHaveBeenCalled();
  });

  it('rejects a user story over the UI limit', async () => {
    const res = await call({
      mode: 'analyzeUserStory',
      userStory: 'a'.repeat(5001),
    });
    expect(res.statusCode).toBe(400);
    expect(generateContentMock).not.toHaveBeenCalled();
  });

  it('rejects non-string parameters', async () => {
    const res = await call({ mode: 'summarizeMeetingNotes', notes: 42 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid notes parameter');
  });

  it('rejects out-of-range ratings', async () => {
    const res = await call({
      mode: 'generateDevelopmentPlan',
      ratings: { 'Requirements elicitation': 9 },
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid ratings parameter');
  });

  it('generates an agenda without attendees (optional in the UI)', async () => {
    const res = await call({
      mode: 'generateMeetingAgenda',
      topic: 'Q3 kick-off',
      objectives: 'Agree scope',
      attendees: '',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe('# Report');
  });

  it('does not leak internal error details', async () => {
    generateContentMock.mockRejectedValue(
      new Error('Sensitive internal detail')
    );
    const res = await call({
      mode: 'analyzeUserStory',
      userStory: 'As a user…',
    });
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('An internal server error occurred.');
    expect(JSON.stringify(res.body)).not.toContain('Sensitive');
  });

  it('treats an empty model response as a server error', async () => {
    generateContentMock.mockResolvedValue({ text: undefined });
    const res = await call({ mode: 'summarizeMeetingNotes', notes: 'Notes' });
    expect(res.statusCode).toBe(500);
  });
});
