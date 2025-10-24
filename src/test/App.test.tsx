import { render, screen } from '@testing-library/react';
import App from '../../App';
import { vi } from 'vitest';

describe('App', () => {
  it('renders in dark mode when prefers-color-scheme is dark', () => {
    // Mock the matchMedia API
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<App />);

    // Check that the dark class is applied to the root element
    expect(document.documentElement).toHaveClass('dark');
  });
});
