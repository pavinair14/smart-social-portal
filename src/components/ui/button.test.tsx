import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
    it('renders with text and supports click', async () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Click me</Button>);
        const btn = screen.getByRole('button', { name: /click me/i });
        await userEvent.click(btn);
        expect(onClick).toHaveBeenCalled();
    });

    it('applies variant and size classes', () => {
        render(
            <Button variant="outline" size="sm">Outline</Button>
        );
        const btn = screen.getByRole('button', { name: /outline/i });
        expect(btn.className).toMatch("border-violet-900");
        expect(btn.className).toMatch("h-8");
    });
});
