export default {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  collectCoverageFrom: ["src/**/*.js"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testTimeout: 10000,
  setupFilesAfterEnv: ["<rootDir>/tests/setup/jest.setup.js"],
};
