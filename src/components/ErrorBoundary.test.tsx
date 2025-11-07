import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
        throw new Error('Test error');
    }
    return <div>No error</div>;
};

describe('ErrorBoundary', () => {
    const originalError = console.error;
    beforeAll(() => {
        console.error = jest.fn();
    });
    afterAll(() => {
        console.error = originalError;
    });

    it('should render children when there is no error', () => {
        render(
            <ErrorBoundary>
                <div>Test component</div>
            </ErrorBoundary>
        );

        expect(screen.getByText('Test component')).toBeInTheDocument();
    });

    it('should render error UI when a child component throws', () => {
        render(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
        expect(screen.getByText("We encountered an unexpected error")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /reload application/i })).toBeInTheDocument();
    });

    it('should render custom fallback when provided', () => {
        const fallbackUI = <div>Custom error message</div>;

        render(
            <ErrorBoundary fallback={fallbackUI}>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByText('Custom error message')).toBeInTheDocument();
        expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
    });

    it('should call console.error when error is caught', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        render(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(consoleErrorSpy).toHaveBeenCalled();
        consoleErrorSpy.mockRestore();
    });
});