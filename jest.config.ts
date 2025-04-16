import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/src/test/**/*.test.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    clearMocks: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/server.ts',
        '!src/test/**'
    ]
};

export default config;
