import '@testing-library/jest-dom';
import { useFormStore } from '@/store/formStore';

// Mock import.meta.env for Vite environment variables
Object.defineProperty(globalThis, 'import', {
    value: {
        meta: {
            env: {
                VITE_OPENAI_API_KEY: 'test-api-key',
            },
        },
    },
    configurable: true,
});

// Mock matchMedia (needed for responsive components)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock ResizeObserver (used by some Radix components)
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

// Suppress specific console methods during tests to reduce noise
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
    // Suppress React/Radix warnings that are expected in test environment
    console.error = jest.fn((...args: any[]) => {
        const message = args[0]?.toString() || '';
        // Allow through unexpected errors, suppress known noise
        if (
            !message.includes('Warning: ReactDOM.render') &&
            !message.includes('Not implemented: HTMLFormElement.prototype.requestSubmit')
        ) {
            originalError(...args);
        }
    });

    console.warn = jest.fn((...args: any[]) => {
        const message = args[0]?.toString() || '';
        // Suppress Radix ARIA warnings in tests (they're dev-only)
        if (!message.includes('Missing `Description`')) {
            originalWarn(...args);
        }
    });
});

afterAll(() => {
    console.error = originalError;
    console.warn = originalWarn;
});

// Clear all storage and reset Zustand stores between tests
beforeEach(() => {
    // Clear storage - this will cause Zustand persist to re-hydrate from empty storage
    localStorage.clear();
    sessionStorage.clear();

    // Reset Zustand form store to initial state
    useFormStore.getState().reset();
});

// Clear all mocks between tests
afterEach(() => {
    jest.clearAllMocks();
});