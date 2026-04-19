import nextJest from 'next/jest'
import type { Config } from 'jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  testMatch: [
    '**/__tests__/**/*.(ts|tsx)',
    '**/?(*.)+(test|spec).(ts|tsx)',
  ],

  maxWorkers: '50%',
  clearMocks: true,
}

export default createJestConfig(config)