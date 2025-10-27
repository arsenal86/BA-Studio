/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { vi } from 'vitest';
import MatchMediaMock from 'vitest-matchmedia-mock';

describe('App', () => {
  let matchMedia: MatchMediaMock;

  beforeEach(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it('renders in dark mode when prefers-color-scheme is dark', () => {
    matchMedia.useMediaQuery('(prefers-color-scheme: dark)');
    render(<App />);

    // Check that the dark class is applied to the root element
    expect(document.documentElement).toHaveClass('dark');
  });
});
