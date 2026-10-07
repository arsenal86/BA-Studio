import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FeatureCard from '../../components/FeatureCard';

// Adapted from #26: guards against the card regressing to a clickable <div>,
// which keyboard and screen-reader users cannot reach.
describe('FeatureCard', () => {
  it('renders as a keyboard-accessible button', () => {
    const handleClick = vi.fn();
    render(
      <FeatureCard
        title="Test card"
        description="Test description"
        icon={<span>Icon</span>}
        onClick={handleClick}
      />
    );

    const button = screen.getByRole('button', { name: /Test card/i });
    expect(button).toHaveAttribute('type', 'button');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
