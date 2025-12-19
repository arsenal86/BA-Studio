## 2024-05-23 - Information Leakage in Serverless Functions
**Vulnerability:** The Netlify Function `gemini.ts` was catching all exceptions and returning `error.message` to the client in the 500 response. This could potentially leak sensitive information like database connection strings, internal paths, or API keys if they appeared in error messages (e.g. from the `GoogleGenAI` library).
**Learning:** Returning raw error messages is a security risk. While convenient for debugging during development, it is dangerous in production.
**Prevention:** Always implement a global error handler that logs the full error details (stack trace, message) to the server logs (e.g., `console.error`) but returns a generic, sanitized message (e.g., "An internal server error occurred") to the client.

## 2024-05-23 - Vitest Mocking Hoisting
**Learning:** When using `vi.mock` in Vitest, the factory function is hoisted to the top of the file. You cannot reference variables defined outside the mock factory unless they are also hoisted using `vi.hoisted()`.
**Prevention:** Use `const { myMock } = vi.hoisted(() => ({ myMock: vi.fn() }))` to define mocks that need to be referenced both inside the `vi.mock` factory and in the tests.

## 2024-05-23 - API Usability vs Security
**Learning:** While masking server errors (500) is crucial for security, client errors (400) due to bad input should be explicit. Masking a "Missing parameter" error as "Internal Server Error" harms usability.
**Prevention:** Validate inputs early and explicitly return 400 with a descriptive message for client-side errors. Only mask the 500 server-side unexpected errors.
