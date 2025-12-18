/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import FeatureCard from '../../components/FeatureCard';
import { vi } from 'vitest';

describe('FeatureCard', () => {
  it('renders a button for accessibility', () => {
    const handleClick = vi.fn();
    render(
      <FeatureCard
        title="Test Title"
        description="Test Description"
        icon={<span>Icon</span>}
        onClick={handleClick}
      />
    );

    const button = screen.getByRole('button', { name: /Test Title/i });
    expect(button).toBeInTheDocument();

    // Check if it's disabled or enabled as expected (should be enabled)
    expect(button).toBeEnabled();

    // Check click handler
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
