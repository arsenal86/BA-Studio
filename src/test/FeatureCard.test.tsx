import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FeatureCard from '../../components/FeatureCard';

describe('FeatureCard', () => {
  it('should be keyboard accessible (render as a button)', () => {
    const handleClick = vi.fn();
    render(
      <FeatureCard
        title="Test Card"
        description="Test Description"
        icon={<span>Icon</span>}
        onClick={handleClick}
      />
    );

    const button = screen.getByRole('button', { name: /Test Card/i });
    expect(button).toBeInTheDocument();

    // Verify click works
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
