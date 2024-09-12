// jest.config.js
export default {
  testEnvironment: 'jest-environment-jsdom', // Explicitly use the jsdom environment
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  // setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Optional setup file if you use one
};
