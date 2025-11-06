import { render } from '@testing-library/react';
import { Progress } from './progress';

describe('Progress', () => {
    it('applies correct transform for value', () => {
        const { container } = render(<Progress value={30} />);
        const indicator = container.querySelector('[data-slot="progress-indicator"]') as HTMLElement;
        expect(indicator).toBeTruthy();
        expect(indicator.style.transform).toBe('translateX(-70%)');
    });
});
