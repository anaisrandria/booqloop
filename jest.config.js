import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

const mergedConfig = async () => {
  const nextConfig = await createJestConfig(config)();
  return {
    ...nextConfig,
    moduleNameMapper: {
      ...config.moduleNameMapper,
      ...nextConfig.moduleNameMapper,
    },
  };
};

export default mergedConfig;
