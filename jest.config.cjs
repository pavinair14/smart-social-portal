module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: {
                jsx: 'react-jsx',
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
                module: 'commonjs',
                moduleResolution: 'node',
            },
        }],
    },
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
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
