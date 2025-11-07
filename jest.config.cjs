module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    globals: {
        'ts-jest': {
            diagnostics: false,
            isolatedModules: true,
        },
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: {
                jsx: 'react-jsx',
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
                module: 'esnext',
                moduleResolution: 'bundler',
                types: ['vite/client', 'jest', 'node'],
                target: 'ES2022',
            },
        }],
    },
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(framer-motion|react-error-boundary)/)',
    ],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/main.tsx',
        '!src/test/**',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '<rootDir>/src/services/aiClient.ts',
        '<rootDir>/src/services/__mocks__/',
    ],
};
