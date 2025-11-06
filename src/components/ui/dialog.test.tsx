import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './dialog';

describe('Dialog', () => {
    it('renders content, title and description when open', () => {
        render(
            <Dialog open>
                <DialogContent>
                    <DialogTitle>Title</DialogTitle>
                    <DialogDescription>Description</DialogDescription>
                </DialogContent>
            </Dialog>
        );

        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        // Close button is rendered by default
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('can hide close button', () => {
        render(
            <Dialog open>
                <DialogContent showCloseButton={false}>
                    <DialogTitle>Another</DialogTitle>
                </DialogContent>
            </Dialog>
        );

        expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });
});
